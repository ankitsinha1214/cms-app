// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapComponent = ({ location }) => {
//   const [center, setCenter] = useState({ lat: location.lat, lng: location.lng });

//   useEffect(() => {
//     setCenter(location);
//   }, [location]);

//   const mapContainerStyle = {
//     height: '50vh',
//     width: '100%'
//   };

//   const API_KEY = process.env.API_KEY;
//   return (
//     <LoadScript googleMapsApiKey={API_KEY} loadingElement={<div />}>
//       <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={9}>
//         <Marker position={center} title="Location" />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LocationAvailable from "../../../assets/images/location_available.png"; 
import LocationInuse from "../../../assets/images/location_in_use.png"; 
import LocationInactive from "../../../assets/images/location_inactive.png"; 
import BlueDotIcon from "../../../assets/images/location.png"; // Add your custom blue dot icon here
// import GeolocationMarker from "geolocation-marker";

const useCurrentLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    }
  }, []);

  return { location, error };
};

const MapComponent = ({ locations }) => {
    const navigate = useNavigate();
  const { location: currentLocation, error } = useCurrentLocation();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
console.log(locations)
  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      setCenter(currentLocation);
    }
  }, [currentLocation]);

  const mapContainerStyle = {
    height: '50vh',
    width: '100%'
  };

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentLocation.lat || !currentLocation.lng) {
    return <div>Map Loading...</div>;
  }
  const pop = (row_data) => {
    navigate("/location/view", { state: row_data });
  };
  return (
    <LoadScript googleMapsApiKey={API_KEY} loadingElement={<div />}>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={center} 
        zoom={14} 
        onLoad={handleMapLoad}
      >
        {isMapLoaded && locations?.map((loc, index) => (
          <Marker 
            key={index} 
            position={{ lat: loc?.direction?.latitude, lng: loc?.direction?.longitude }} 
            title={loc?.name} 
            onClick={(e) => pop(loc)}
            icon={(loc?.availCount > 0) ? {
              url: LocationAvailable, 
              scaledSize: new window.google.maps.Size(25, 25), 
            } : (loc?.inuseCount > 0) ? {
              url: LocationInuse, 
              scaledSize: new window.google.maps.Size(25, 25), 
            } : {
              url: LocationInactive, 
              scaledSize: new window.google.maps.Size(25, 25), 
            }}
          />
        ))}
        {isMapLoaded && (
          <Marker 
            position={center}
            title="Current Location"
            icon={{
              url: BlueDotIcon, 
              scaledSize: new window.google.maps.Size(25, 25), 
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
