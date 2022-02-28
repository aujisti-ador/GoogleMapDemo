// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import SearchableDropDown from 'react-native-searchable-dropdown';
import { getDistance } from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');
import Geolocation from 'react-native-geolocation-service';


const App = () => {

  const [radiusSize] = useState(2000)

  const [wearhouse, setWearhouse] = useState({
    name: 'Firmgate Wear House',
    latitude: 23.7625,
    longitude: 90.3785
  })

  const [inside, setInside] = useState({
    latitude: 23.776150402778374,
    longitude: 90.37061632815984
  })

  const [outside, setOutside] = useState({
    latitude: 23.7991,
    longitude: 90.3879
  })


  const [marker, setMarker] = useState(
    {
      latitude: 0,
      longitude: 0
    })

  const [region, setRegion] = useState(
    {
      latitude: 23.777176,
      longitude: 90.399452
    })

  const [locationList, setLocationList] = useState([
    {
      name: 'Gononet Online Solution Limited',
      latitude: 23.7549197209571,
      longitude: 90.39199367826377
    },
    {
      name: 'Tokya Square',
      latitude: 23.765193055086584,
      longitude: 90.35896178147031
    },
    {
      name: 'Liberation War Museum',
      latitude: 23.776150402778374,
      longitude: 90.37061632815984
    },
    {
      name: 'Mirpur Dental',
      latitude: 23.7991,
      longitude: 90.3879
    },
    {
      name: 'Lalbag Fort',
      latitude: 23.7189,
      longitude: 90.3882
    }
  ])

  // const handleDistance = (latlong) => {
  //   console.log(latlong.nativeEvent)
  //   const distance = getDistance(wearhouse, latlong.nativeEvent.coordinate)
  //   if (distance >= radiusSize) {
  //     ToastAndroid.show("Sorry, Outside Coverage", ToastAndroid.SHORT);
  //   } else {
  //     ToastAndroid.show("We are delivering", ToastAndroid.SHORT);
  //   }
  // }

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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
      if (granted)
        handleCurrentLocation()
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider='google'
          region={
            {
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          }
          // followsUserLocation={true}
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
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data);
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
            // currentLocation={true}
            currentLocationLabel='Current location'
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
            style={styles.img}
            source={require('./gps.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
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
  img: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});