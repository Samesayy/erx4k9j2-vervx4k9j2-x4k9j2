// context/ListSpaceContext.jsx
import { createContext, useReducer, useContext } from 'react';

// 1. Define the initial state for the entire multi-step form
const initialState = {
  title: '',
  description: '',
  spaceTypes: [], // This will hold the IDs of selected space types
  cityId: null,
  address: '',
  latitude: null,
  longitude: null,
  images: [], // Will hold objects with { file, previewUrl }
  amenities: [],
  pricePerMonth: '',
  pricePerDay: '',
  availableFrom: null,
};

// 2. Create the context
const ListSpaceContext = createContext();

// 3. Create the reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.payload };
    case 'SET_STATE':
        return { ...state, ...action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

// 4. Create the Provider component
export function ListSpaceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ListSpaceContext.Provider value={{ formData: state, dispatch }}>
      {children}
    </ListSpaceContext.Provider>
  );
}

// 5. Create a custom hook for easy access to the context
export function useListSpace() {
  const context = useContext(ListSpaceContext);
  if (context === undefined) {
    throw new Error('useListSpace must be used within a ListSpaceProvider');
  }
  return context;
}