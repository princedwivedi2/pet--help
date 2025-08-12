import { useEffect, useRef } from 'react';

// Google Maps API integration using environment variable
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_CENTER = { lat: 37.7749, lng: -122.4194 };

export default function VetFinder() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }
    function initMap() {
      if (!mapRef.current) return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: MAP_CENTER,
        zoom: 12,
        styles: [
          // Custom map style for a soft look
          { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#FDF6F0' }] },
        ],
      });
      // Example paw marker (replace with 3D paw asset)
      new window.google.maps.Marker({
        position: MAP_CENTER,
        map,
        icon: {
          url: '/assets/paw-pin.png', // Replace with 3D paw pin asset
          scaledSize: new window.google.maps.Size(48, 48),
        },
      });
    }
  }, []);

  return (
    <section className="min-h-screen bg-background flex flex-col items-center py-8 px-2">
      <h2 className="font-heading text-3xl text-primary mb-6">Find a Vet Near You</h2>
      <div className="w-full max-w-2xl h-96 rounded-xl shadow-card overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />
      </div>
      <p className="text-secondary mt-4">Map uses Google Maps API. Replace API key and paw pin asset for production.</p>
    </section>
  );
}
