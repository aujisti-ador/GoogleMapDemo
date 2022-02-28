import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data);
        console.log('===============')
        console.log(details);
      }}
      query={{
        key: 'AIzaSyDXfQuQr_ciw0HzKycjJs_cVOVtrVGaIkI',
        language: 'en',
        components: 'country:bd',
      }}
      fetchDetails={true}
      currentLocation={true}
      currentLocationLabel='Current location'
    />
  );
};

export default GooglePlacesInput;