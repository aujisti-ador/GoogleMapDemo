// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');
import Geolocation from 'react-native-geolocation-service';


const App = () => {

  const [marker, setMarker] = useState(
    {
      latitude: 0,
      longitude: 0
    })

  const handleCurrentLocation = () => {
    console.log('here in HandleCurrentLocation')
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('===>>', position.coords);
        setMarker(position.coords)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    )
  }

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
      },
      // Android only
      androidProvider: "auto",
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
    })

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse",
        rationale: {
          title: "We need to access your location",
          message: "We use your location to show where you are on the map",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    }).then(granted => {
      if (granted) {
        handleCurrentLocation()
      }
      else {
        ToastAndroid.showWithGravity(
          "Loction permission is not provided!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider='google'
        region={
          {
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }
        }
        loadingEnabled={true}
        onMapReady={() => {
          handleCurrentLocation
        }}
      >
        <Marker
          coordinate={marker}
        // title={marker}
        // description={marker}
        />
      </MapView>

      <View style={{ position: 'absolute', top: 60, width: '90%' }}>
        <GooglePlacesAutocomplete
          placeholder='Search Places'
          textInputProps={{
            placeholderTextColor: '#8A939C',
            returnKeyType: "search",
            color: 'black'
          }}
          onPress={(data, details = null) => {
            console.log('===============')
            console.log(details);
            setMarker({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            })
          }}
          query={{
            key: 'AIzaSyDXfQuQr_ciw0HzKycjJs_cVOVtrVGaIkI',
            language: 'en',
            components: 'country:bd',
          }}
          fetchDetails={true}
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            description: {
              fontWeight: 'bold',
              color: "#007",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              opacity: 0.9,
            }
          }}
        />
      </View>

      <TouchableOpacity style={{
        position: 'absolute',
        width: 50,
        height: 50,
        bottom: 60,
        right: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
        onPress={handleCurrentLocation}
      >
        <Image
          style={styles.currentLocationIcon}
          source={require('./gps.png')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  currentLocationIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});


export default App;