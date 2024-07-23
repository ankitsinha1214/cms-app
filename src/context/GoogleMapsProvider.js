// GoogleMapsProvider.js
import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const GoogleMapsProvider = ({ children }) => (
  <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
    {children}
  </LoadScript>
);
