import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import TextField from "@mui/material/TextField";

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

function LocationPicker({ initialLocation, onLocationChange }) {
  const [markerPosition, setMarkerPosition] = useState(initialLocation || { lat: -3.745, lng: -38.523 });
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = useCallback((map) => {
    if (initialLocation) {
      map.panTo(initialLocation);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.panTo({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => null
      );
    }
  }, [initialLocation]);

  const onMarkerDragEnd = useCallback((e) => {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();
    setMarkerPosition({ latitude, longitude });
    onLocationChange({ latitude, longitude });
  }, [onLocationChange]);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place.geometry.location;
      const latitude = location.lat();
      const longitude = location.lng();
      setMarkerPosition({ latitude, longitude });
      onLocationChange({ latitude, longitude });
    }
  };

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
        zoom={15}
        onLoad={onLoad}
      >
        <Marker position={markerPosition} draggable onDragEnd={onMarkerDragEnd} />
      </GoogleMap>
      {/* <Autocomplete
        onLoad={onAutocompleteLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <TextField
          type="text"
          placeholder="Search a location"
          variant="outlined"
          style={{
            width: '100%',
            // position: 'absolute',
            // top: '10px',
            zIndex: 1,
            padding: '10px',
          }}
        />
      </Autocomplete> */}
    </>
  );
}

export default LocationPicker;
