import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import LocationAvailable from '../../../assets/images/location_available.png';
import LocationInuse from '../../../assets/images/location_in_use.png';
import LocationInactive from '../../../assets/images/location_inactive.png';
import BlueDotIcon from '../../../assets/images/location.png';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Alert, Flex, Spin } from 'antd';
import "../Somecss.css";
const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

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

const MapComponent = ({ locations, givenHeight, zoomLevel }) => {
  const [locations1, setLocations1] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLocations1(locations);
  }, [locations]);
  console.log(locations);
  console.log(locations1);
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
    height: givenHeight || '50vh',
    width: '100%'
  };

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


  // Trigger map load after locations is set
  useEffect(() => {
    if (mapInstance && locations1.length > 0) {
      handleMapLoad(mapInstance);
    }
  }, [locations1, mapInstance]);

  const handleMapLoad = (map) => {
    console.log("Locations:", locations1);
    localStorage.setItem("maploaded", "true");
    // Initialize marker clusterer
    const markers = locations1.map((loc, index) => {
      const position = { lat: loc?.direction?.latitude, lng: loc?.direction?.longitude };
      const icon = (loc?.availCount > 0) ? {
        url: LocationAvailable,
        scaledSize: new window.google.maps.Size(25, 25),
      } : (loc?.inuseCount > 0) ? {
        url: LocationInuse,
        scaledSize: new window.google.maps.Size(25, 25),
      } : {
        url: LocationInactive,
        scaledSize: new window.google.maps.Size(25, 25),
      };
      // const icon = {
      //   url: LocationAvailable,
      //   scaledSize: new window.google.maps.Size(25, 25),
      // }
      const marker = new window.google.maps.Marker({
        position,
        icon,
        title: loc?.name
      });
      // Add click event listener to the marker
      marker.addListener('click', () => {
        handleMarkerClick(loc);
      });
      return marker;
      // return new window.google.maps.Marker({ position, icon, title: loc?.name });
    });
    console.log("Markers created:", markers);
    setIsMapLoaded(true);
    // Define custom cluster styles
    const clusterStyles = [
      {
        textColor: 'white', // Cluster text color
        // url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
        height: 50,
        url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
        width: 50,
        anchorText: [-10, 0],
        backgroundColor: 'green',
      },
    ];
    new MarkerClusterer({
      map,
      markers,
      styles: clusterStyles
    });
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentLocation.lat || !currentLocation.lng) {
    return <Flex gap="middle" justify="center">
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </Flex>
    // return <div>Map Loading...</div>;
  }

  const pop = (row_data) => {
    // console.log(row_data)
    navigate("/location/view", { state: row_data?._id });
  };
  const mapOptions = {
    styles: [
      {
        elementType: "geometry",
        stylers: [{ color: "#212121" }],
      },
      {
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#212121" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#292929" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#181818" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{ color: "#2c2c2c" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8a8a8a" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#373737" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#3c3c3c" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#4e4e4e" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#303030" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#3d3d3d" }],
      },
    ],
    mapTypeId: 'roadmap',
    // mapTypeId: 'default',
    // mapTypeId: 'satellite',
    // disableDefaultUI: true, // Hides default controls
    disableDefaultUI: true, // Hides all default UI controls
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_CENTER, // Adjust position if needed
    },
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoomLevel || 14}
      // onLoad={handleMapLoad}
      onLoad={(map) => setMapInstance(map)}
      options={mapOptions}
    >
      {/* {isMapLoaded && locations1?.map((loc, index) => (
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
      ))} */}
      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation?.direction?.latitude, lng: selectedLocation?.direction?.longitude }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
            {/* alignItems:"center", */}
            <h4 style={{ marginBottom: "0.5rem" }}>{selectedLocation?.name}</h4>
            <p>{selectedLocation?.data?.address}</p>
            <Button variant="text" onClick={() => pop(selectedLocation?.data)}>View Location</Button>
          </div>
        </InfoWindow>
        //   <InfoWindow
        //   position={{ lat: selectedLocation?.direction?.latitude, lng: selectedLocation?.direction?.longitude }}
        //   content={
        //     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        //       <h4 style={{ margin: 0 }}>{selectedLocation.name}</h4>
        //     </div>
        //   }
        //   onCloseClick={() => setSelectedLocation(null)}
        // >
        //   <span>something</span>
        //   </InfoWindow>
        // {/* <div style={{ width: "200px" }}>
        //   <h4 style={{ margin: "0", padding: "0", fontSize: "16px", lineHeight: "1.2" }}>
        //     {selectedLocation.name}
        //   </h4>
        //   <p style={{ margin: "4px 0", padding: "0", fontSize: "14px", lineHeight: "1.4" }}>
        //     {selectedLocation.data?.address}
        //   </p>
        //   <p style={{ margin: "4px 0", fontSize: "12px", color: "gray" }}>
        //   <Button variant="text" onClick={() => pop(selectedLocation?.data)}>View Location</Button>
        //   </p>
        // </div> */}
        //    <OverlayView
        //    position={{
        //      lat: selectedLocation?.direction?.latitude,
        //      lng: selectedLocation?.direction?.longitude,
        //    }}
        //    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        //  >
        //    <div style={{ background: "white", padding: "10px", borderRadius: "8px", position: "relative" }}>
        //      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        //        <h4 style={{ margin: 0 }}>{selectedLocation?.name}</h4>
        //        <button onClick={() => setSelectedLocation(null)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
        //          ❌
        //        </button>
        //      </div>
        //      <p>{selectedLocation?.data?.address}</p>
        //      <Button variant="text" onClick={() => pop(selectedLocation?.data)}>View Location</Button>
        //    </div>
        //  </OverlayView>
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
