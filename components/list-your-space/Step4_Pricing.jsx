// components/list-your-space/Step4_Pricing.jsx
import { useListSpace } from '../../context/ListSpaceContext';

export default function Step4_Pricing() {
  const { formData, dispatch } = useListSpace();

  const handleFieldChange = (field, value) => {
    // Ensure numeric inputs are stored as numbers, not strings
    const isNumeric = ['pricePerMonth', 'pricePerDay'].includes(field);
    dispatch({ 
      type: 'UPDATE_FIELD', 
      field, 
      payload: isNumeric ? (value === '' ? '' : parseFloat(value)) : value 
    });
  };

  return (
    <div className="space-y-12 animate-fade-in-down">
      {/* --- Pricing Section --- */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">Set Your Price</h2>
        <p className="text-medium-gray mt-1">Define the pricing for your workspace. All prices are in INR (₹).</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price per Month */}
          <div>
            <label htmlFor="pricePerMonth" className="block text-sm font-medium text-gray-700">Price per Seat (Monthly)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                id="pricePerMonth"
                value={formData.pricePerMonth || ''}
                onChange={(e) => handleFieldChange('pricePerMonth', e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                placeholder="0.00"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm">/ month</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">For coworking desks and private offices.</p>
          </div>
          
          {/* Price per Day */}
          <div>
            <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price per Day (Day Pass)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                    type="number"
                    id="pricePerDay"
                    value={formData.pricePerDay || ''}
                    onChange={(e) => handleFieldChange('pricePerDay', e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                    placeholder="0.00"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">/ day</span>
                </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">Optional: For "Day Pass" offerings.</p>
          </div>
        </div>
      </div>
      
      {/* --- Availability Section --- */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">Set Your Availability</h2>
        <p className="text-medium-gray mt-1">Let guests know when your space is open for booking.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700">Available From</label>
                <input 
                    type="date"
                    id="availableFrom"
                    value={formData.availableFrom || ''}
                    onChange={(e) => handleFieldChange('availableFrom', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="availableTo" className="block text-sm font-medium text-gray-700">Available Until (Optional)</label>
                <input 
                    type="date"
                    id="availableTo"
                    value={formData.availableTo || ''}
                    onChange={(e) => handleFieldChange('availableTo', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">Leave blank for ongoing availability.</p>
            </div>
        </div>
      </div>
    </div>
  );
}