// components/list-your-space/Step3_PhotosAmenities.jsx
import { useListSpace } from '../../context/ListSpaceContext';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';

// A comprehensive list of amenities, grouped by category
const amenityCategories = {
  Essentials: ['Wi-Fi', 'Air Conditioning', 'Heating', 'Dedicated Workspace', 'Power Backup'],
  Kitchen: ['Refrigerator', 'Microwave', 'Coffee/Tea Maker', 'Pantry Access'],
  Facilities: ['Parking Available', 'Elevator', 'Printing/Scanning', 'Reception Services'],
  Safety: ['24/7 Access', 'Security Cameras', 'Lockable Cabins'],
  Recreation: ['Lounge Area', 'Outdoor Terrace', 'Pet Friendly'],
};

export default function Step3_PhotosAmenities() {
  const { formData, dispatch } = useListSpace();

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, payload: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageObjects = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    // Append new images to existing ones
    handleFieldChange('images', [...formData.images, ...imageObjects]);
  };
  
  const handleRemoveImage = (indexToRemove) => {
    const newImages = formData.images.filter((_, index) => index !== indexToRemove);
    handleFieldChange('images', newImages);
  };

  const handleAmenityChange = (amenity) => {
    const currentAmenities = formData.amenities;
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(item => item !== amenity)
      : [...currentAmenities, amenity];
    handleFieldChange('amenities', newAmenities);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageObjects = files.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
    }));
    handleFieldChange('images', [...formData.images, ...imageObjects]);
  };


  return (
    <div className="space-y-12 animate-fade-in-down">
      {/* --- Photos Section --- */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">Showcase Your Space</h2>
        <p className="text-medium-gray mt-1">Add at least 3 high-quality photos. Listings with more photos get more views.</p>
        
        <div 
          className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-brand-primary"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        {/* Image Previews */}
        {formData.images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden border">
                <Image src={image.previewUrl} alt={`Preview ${index + 1}`} width={200} height={200} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                   <button
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                   >
                     <FiTrash2 size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Amenities Section --- */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">List Your Amenities</h2>
        <p className="text-medium-gray mt-1">Select all the features and amenities available at your workspace.</p>

        <div className="mt-6 space-y-6">
          {Object.entries(amenityCategories).map(([category, amenities]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-primary-dark border-b pb-2 mb-4">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}