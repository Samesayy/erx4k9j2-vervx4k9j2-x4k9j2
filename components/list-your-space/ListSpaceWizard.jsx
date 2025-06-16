// components/list-your-space/ListSpaceWizard.jsx
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useListSpace } from '../../context/ListSpaceContext';

import Navbar from '../Navbar';
import Footer from '../Footer';
import StepIndicator from './StepIndicator';
import Step1_Details from './Step1_Details';
import Step2_Location from './Step2_Location';
import Step3_PhotosAmenities from './Step3_PhotosAmenities';
import Step4_Pricing from './Step4_Pricing';
import Step5_Review from './Step5_Review';

export default function ListSpaceWizard({ listingId }) {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { formData, dispatch } = useListSpace();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cities, setCities] = useState([]);
  const [spaceTypes, setSpaceTypes] = useState([]);

  // This effect fetches data for dropdowns and for an existing listing if in EDIT mode.
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      // Fetch cities and space types for the dropdowns
      const { data: citiesData } = await supabase.from('cities').select('id, name');
      if (citiesData) setCities(citiesData);
      const { data: spaceTypesData } = await supabase.from('space_types').select('id, name');
      if (spaceTypesData) setSpaceTypes(spaceTypesData);
      
      // If we are in EDIT mode, fetch the specific listing's data
      if (listingId && user) {
        const { data, error } = await supabase
          .from('listings')
          .select('*, listing_space_types(space_type_id)')
          .eq('id', listingId)
          .eq('host_id', user.id)
          .single();

        if (error) {
          console.error("Error fetching listing for edit:", error);
          alert("Could not load your listing data.");
          router.push('/dashboard/host/listings');
        } else if (data) {
          // Format the data and set the form state
          const formattedData = {
            ...data,
            spaceTypes: data.listing_space_types.map(st => st.space_type_id),
            cityId: data.city_id,
            images: [], // Images are handled separately
          };
          dispatch({ type: 'SET_STATE', payload: formattedData });
        }
      }
      setLoading(false);
    };
    
    if(user) {
        fetchInitialData();
    }
  }, [listingId, user, supabase, dispatch, router]);

  const handleNext = () => currentStep < 5 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!user) throw new Error("You must be logged in.");

      // UPLOAD IMAGES
      const imageUrls = await Promise.all(
        formData.images.map(async (image) => {
          const filePath = `listings/${user.id}/${Date.now()}-${image.file.name}`;
          const { data, error } = await supabase.storage.from('listings').upload(filePath, image.file);
          if (error) throw error;
          const { data: { publicUrl } } = supabase.storage.from('listings').getPublicUrl(data.path);
          return publicUrl;
        })
      );

      // PREPARE LISTING DATA
      const listingPayload = {
        host_id: user.id,
        title: formData.title,
        description: formData.description,
        city_id: formData.cityId,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        price_per_month: formData.pricePerMonth || null,
        price_per_day: formData.pricePerDay || null,
        amenities: formData.amenities,
        images: imageUrls,
        available_from: formData.availableFrom || null,
        available_to: formData.availableTo || null,
      };

      // Check if we are UPDATING or CREATING
      if (listingId) {
        // --- UPDATE LOGIC ---
        const { data: updatedListing, error: updateError } = await supabase
          .from('listings').update(listingPayload).eq('id', listingId).select().single();
        if (updateError) throw updateError;
        
        // Update pivot table: delete old entries, then insert new ones
        await supabase.from('listing_space_types').delete().eq('listing_id', listingId);
        const spaceTypeLinks = formData.spaceTypes.map(typeId => ({ listing_id: listingId, space_type_id: typeId }));
        await supabase.from('listing_space_types').insert(spaceTypeLinks);

        alert('Listing updated successfully!');
        router.push(`/listing/${listingId}`);

      } else {
        // --- CREATE LOGIC ---
        const { data: newListing, error: listingError } = await supabase
          .from('listings').insert(listingPayload).select().single();
        if (listingError) throw listingError;

        const spaceTypeLinks = formData.spaceTypes.map(typeId => ({ listing_id: newListing.id, space_type_id: typeId }));
        await supabase.from('listing_space_types').insert(spaceTypeLinks);
        
        alert('Congratulations! Your listing has been submitted successfully.');
        router.push(`/listing/${newListing.id}`);
      }

    } catch (error) {
      console.error("Submission failed:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-4xl py-12 px-4">
        <StepIndicator currentStep={currentStep} totalSteps={5} />
        <div className="mt-8">
            {currentStep === 1 && <Step1_Details availableSpaceTypes={spaceTypes} />}
            {currentStep === 2 && <Step2_Location availableCities={cities} />}
            {currentStep === 3 && <Step3_PhotosAmenities />}
            {currentStep === 4 && <Step4_Pricing />}
            {currentStep === 5 && <Step5_Review availableCities={cities} availableSpaceTypes={spaceTypes} />}
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between">
            <button onClick={handleBack} disabled={currentStep === 1 || isSubmitting} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50">Back</button>
            <button onClick={currentStep === 5 ? handleSubmit : handleNext} disabled={isSubmitting} className="px-6 py-2 bg-brand-primary text-white rounded-md text-sm font-medium hover:bg-accent disabled:opacity-50">
              {isSubmitting ? 'Saving...' : (currentStep === 5 ? (listingId ? 'Save Changes' : 'Confirm & Submit') : 'Next Step')}
            </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}