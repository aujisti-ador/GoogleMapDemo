// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';

const App = () => {

  const [marker, setMarker] = useState(
    {
      latitude: 0,
      longitude: 0
    })

  let _startUpdatingLocation = () => {
    console.log('in start updating location')
    // RNLocation.subscribeToLocationUpdates(
    //   locations => {
    //     // this.setState({ location: locations[0] });
    //     console.log('here')
    //     console.log(locations)

    //     setMarker({
    //       latitude: locations[0].latitude,
    //       longitude: locations[0].longitude
    //     })
    //   }
    // )

    // RNLocation.getLatestLocation({ timeout: 60000 })
    //   .then(latestLocation => {
    //     // Use the location here
    //     console.log(latestLocation)

    //     setMarker({
    //       latitude: locations[0].latitude,
    //       longitude: locations[0].longitude
    //     })
    //   })
  }

  useEffect(() => {
    // Geolocation.getCurrentPosition(position => {
    //   const initialPosition = JSON.stringify(position)
    //   // console.warn(initialPosition)
    //   // console.warn(position.coords.latitude)
    //   // console.warn(position.coords.longitude)
    //   setMarker({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude
    //   })

    // })

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

    // RNLocation.checkPermission({
    //   ios: 'whenInUse', // or 'always'
    //   android: {
    //     detail: 'coarse' // or 'fine'
    //   }
    // }).then((res) => {
    //   console.log(res)
    // })

    // RNLocation.getLatestLocation({ timeout: 60000 })
    //   .then(latestLocation => {
    //     // Use the location here
    //     console.log(latestLocation)

    //     setMarker({
    //       latitude: locations[0].latitude,
    //       longitude: locations[0].longitude
    //     })
    //   })


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
        // console.log(granted)

        // _startUpdatingLocation()

        RNLocation.getLatestLocation({ timeout: 60000 })
          .then(latestLocation => {
            // Use the location here
            console.log(latestLocation)

            setMarker({
              latitude: 37.42342342342342,
              longitude: -122.08395287867832
            })
          })

        console.log('----', marker)
      }
    })
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          // region={{
          //   latitude: marker.latitude,
          //   longitude: marker.longitude,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}

          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled={true}
          onMapReady={() => {

          }}
        >
          <Marker
            draggable
            coordinate={marker}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'LatLong'}
            description={
              `Latitude: ${marker.latitude}
               Longitude: ${marker.longitude}`
            }
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

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
});