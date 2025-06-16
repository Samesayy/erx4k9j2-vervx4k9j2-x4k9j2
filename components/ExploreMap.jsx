// components/ExploreMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import { useEffect } from 'react';

// Custom component to handle map view changes and bound updates
const MapController = ({ listings }) => {
  const map = useMap();

  useEffect(() => {
    if (listings && listings.length > 0) {
      const bounds = L.latLngBounds(listings.map(l => [l.latitude, l.longitude]));
      // Add a bit of padding to the bounds
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [listings, map]);

  return null;
};

export default function ExploreMap({ listings, hoveredListingId, selectedListing, setSelectedListing, onPinClick }) {
  
  // Create a custom icon using Lucide icons
  const createIcon = (isHovered) => {
    const iconHtml = ReactDOMServer.renderToString(
      <MapPin className={`h-8 w-8 transition-transform duration-200 ${isHovered ? 'text-brand-accent' : 'text-brand-primary'}`} fill="currentColor" />
    );
    return L.divIcon({
      html: iconHtml,
      className: 'bg-transparent border-none',
      iconSize: [32, 32],
      iconAnchor: [16, 32], // Point of the icon
    });
  };

  const initialCenter = listings.length > 0 
    ? [listings[0].latitude, listings[0].longitude] 
    : [28.6139, 77.2090]; // Default to Delhi if no listings

  return (
    <MapContainer 
        center={initialCenter} 
        zoom={11} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", backgroundColor: '#1A1A1A' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {listings.map(listing => (
        <Marker 
          key={listing.id} 
          position={[listing.latitude, listing.longitude]} 
          icon={createIcon(hoveredListingId === listing.id)}
          eventHandlers={{
              click: () => {
                  // When a pin is clicked, call both functions
                  if (onPinClick) {
                    onPinClick(listing);
                  }
              },
          }}
        />
      ))}

      {selectedListing && (
        <Popup
          position={[selectedListing.latitude, selectedListing.longitude]}
          onClose={() => setSelectedListing(null)}
        >
          <div className="w-48">
            <div className="h-24 w-full rounded-md overflow-hidden mb-2 bg-gray-200">
                 <img 
                    src={(selectedListing.images && selectedListing.images.length > 0) ? selectedListing.images[0] : 'https://placehold.co/800x600/2C3E50/ECF0F1?text=Verve99'} 
                    alt={selectedListing.title} 
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="font-bold text-sm text-primary-dark">{selectedListing.title}</h3>
            <p className="text-xs text-brand-primary font-semibold">₹{selectedListing.price_per_month?.toLocaleString()} /month</p>
          </div>
        </Popup>
      )}
      
      <MapController listings={listings} />
    </MapContainer>
  );
}
