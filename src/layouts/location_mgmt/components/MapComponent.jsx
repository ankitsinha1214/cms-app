import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import LocationAvailable from '../../../assets/images/location_available.png'; 
import LocationInuse from '../../../assets/images/location_in_use.png'; 
import LocationInactive from '../../../assets/images/location_inactive.png'; 
import BlueDotIcon from '../../../assets/images/location.png';

const useCurrentLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
  localStorage.setItem("maploaded", "false");
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
  localStorage.setItem("Currentlocation", JSON.stringify(currentLocation));
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      setCenter(currentLocation);
    }
  }, [currentLocation]);

  const mapContainerStyle = {
    height: '50vh',
    width: '100%'
  };

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const handleMapLoad = () => {
    localStorage.setItem("maploaded", "true");
    setIsMapLoaded(true);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
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
          onClick={(e) => handleMarkerClick(loc)}
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
      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation?.direction?.latitude, lng: selectedLocation?.direction?.longitude }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h4>{selectedLocation?.name}</h4>
            <p>{selectedLocation?.data?.address}</p>
            <Button variant="text" onClick={() => pop(selectedLocation?.data)}>View Location</Button>
          </div>
        </InfoWindow>
      )}
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
  );
};

export default MapComponent;
