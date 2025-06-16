import { useListSpace } from '../../context/ListSpaceContext';

export default function Step1_Details({ availableSpaceTypes }) {
  const { formData, dispatch } = useListSpace();

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, payload: value });
  };
  
  const handleSpaceTypeChange = (spaceTypeId) => {
    const currentTypes = formData.spaceTypes;
    const newTypes = currentTypes.includes(spaceTypeId)
      ? currentTypes.filter(id => id !== spaceTypeId)
      : [...currentTypes, spaceTypeId];
    handleFieldChange('spaceTypes', newTypes);
  };

  return (
    <div className="space-y-8 animate-fade-in-down">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">Describe Your Space</h2>
        <p className="text-medium-gray mt-1">
          Start with the basics. What is your workspace called and what makes it special?
        </p>
      </div>

      {/* Workspace Name */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Workspace Name
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
          placeholder="e.g., The Creative Loft"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
          placeholder="Tell guests what they'll love about your space."
        />
      </div>

      {/* Space Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What kind of spaces are you offering?
        </label>
        <p className="text-xs text-gray-500">Select all that apply.</p>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {availableSpaceTypes.map(type => (
            <label
              key={type.id}
              className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-primary-light"
            >
              <input
                type="checkbox"
                checked={formData.spaceTypes.includes(type.id)}
                onChange={() => handleSpaceTypeChange(type.id)}
                className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
              />
              <span className="text-sm font-medium text-gray-700">{type.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
);
}
