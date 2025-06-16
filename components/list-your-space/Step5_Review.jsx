// components/list-your-space/Step5_Review.jsx
import { useListSpace } from '../../context/ListSpaceContext';
import Image from 'next/image';

// We need these temporary lists again to map IDs back to names for the review page
const availableSpaceTypes = [
  { id: '1', name: 'Coworking Space' }, { id: '2', name: 'Serviced Office' },
  { id: '3', name: 'Virtual Office' }, { id: '4', name: 'Meeting Room' },
  { id: '5', name: 'Training Room' }, { id: '6', name: 'Day Office' },
];
const availableCities = [
  { id: '1', name: 'Delhi' }, { id: '2', name: 'Gurgaon' }, { id: '3', name: 'Noida' },
  { id: '4', name: 'Mumbai' }, { id: '5', name: 'Bangalore' }, { id: '6', name: 'Pune' },
  { id: '7', name: 'Chennai' }, { id: '8', name: 'Hyderabad' },
];


// A small helper component for displaying each reviewed section
function ReviewSection({ title, children }) {
  return (
    <div className="py-4 border-b">
      <h3 className="text-lg font-semibold text-primary-dark">{title}</h3>
      <div className="mt-2 text-medium-gray space-y-1">{children}</div>
    </div>
  );
}

export default function Step5_Review() {
  const { formData } = useListSpace();
  
  // Find the full names for IDs to display them
  const selectedCityName = availableCities.find(c => c.id === formData.cityId)?.name || 'Not specified';
  const selectedSpaceTypeNames = formData.spaceTypes
    .map(id => availableSpaceTypes.find(t => t.id === id)?.name)
    .join(', ');

  return (
    <div className="space-y-6 animate-fade-in-down">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">Review Your Listing</h2>
        <p className="text-medium-gray mt-1">Please review all the details carefully before submitting. You can go back to any step to make changes.</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <ReviewSection title="Details">
          <p><strong>Name:</strong> {formData.title}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Space Types:</strong> {selectedSpaceTypeNames}</p>
        </ReviewSection>

        <ReviewSection title="Location">
          <p><strong>City:</strong> {selectedCityName}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Coordinates:</strong> Lat: {formData.latitude}, Lng: {formData.longitude}</p>
        </ReviewSection>

        <ReviewSection title="Photos & Amenities">
           <p><strong>Amenities:</strong> {formData.amenities.join(', ')}</p>
           <p className="font-semibold mt-2">Photos:</p>
           <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden border">
                <Image src={image.previewUrl} alt={`Preview ${index + 1}`} width={150} height={150} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection title="Pricing & Availability">
          <p><strong>Monthly Price:</strong> ₹{formData.pricePerMonth} /seat</p>
          <p><strong>Daily Price:</strong> ₹{formData.pricePerDay} /day</p>
          <p><strong>Available From:</strong> {formData.availableFrom}</p>
          <p><strong>Available Until:</strong> {formData.availableTo || 'Ongoing'}</p>
        </ReviewSection>
      </div>
    </div>
  );
}