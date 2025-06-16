import { useListSpace } from '../../context/ListSpaceContext';

export default function Step2_Location({ availableCities }) {
  const { formData, dispatch } = useListSpace();

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, payload: value });
  };

  return (
    <div className="space-y-8 animate-fade-in-down">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">
          Where is your space located?
        </h2>
        <p className="text-medium-gray mt-1">
          Provide the address and location details so guests can find you.
        </p>
      </div>

      {/* City Dropdown */}
      <div>
        <label htmlFor="cityId" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <select
          id="cityId"
          value={formData.cityId || ''}
          onChange={(e) => handleFieldChange('cityId', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        >
          <option value="" disabled>
            Select a city
          </option>
          {availableCities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Full Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Full Address
        </label>
        <textarea
          id="address"
          rows={3}
          value={formData.address}
          onChange={(e) => handleFieldChange('address', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
          placeholder="e.g., 123 Business Avenue, Tech Park, Sector 5"
        />
      </div>
      
      {/* Coordinates */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-bold text-blue-800">For Future Enhancement:</h4>
        <p className="text-xs text-blue-700">
          An interactive map to pin your location would be ideal here. For now, please provide the coordinates manually.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="number"
            id="latitude"
            value={formData.latitude || ''}
            onChange={(e) => handleFieldChange('latitude', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
            placeholder="e.g., 28.6139"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="number"
            id="longitude"
            value={formData.longitude || ''}
            onChange={(e) => handleFieldChange('longitude', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
            placeholder="e.g., 77.2090"
          />
        </div>
      </div>
    </div>
);
}
