import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomButton from '../../components/customButton/customButton';
import { useNavigation } from '@react-navigation/native';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD7XaZrmTwyXf_w8pGftmd6GC1eI1jOrFs';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      fetchPlaces(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchPlaces = async (latitude, longitude) => {
    try {
      const types = ['gym', 'park', 'swimming_pool'];
      const promises = types.map(type =>
        fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
        ).then(response => response.json())
      );

      const results = await Promise.all(promises);
      const placesData = results.flatMap(data =>
        data.results.map(place => ({
          id: place.place_id,
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          address: place.vicinity,
          type: place.types.find(t => types.includes(t)),
          photoReference: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null
        }))
      );
      setPlaces(placesData);
    } catch (error) {
      setErrorMsg('Failed to fetch places');
    }
  };

  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#203C3B" />
        <Text style={styles.loadingStyle}>Waiting for user location...</Text>
      </View>
    );
  }

  const handleOnPress = () => {
    navigation.navigate('Fitness');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Here you can see places where you can do physical exercises!</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              description={`${place.address} - ${place.type}`}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeAddress}>{place.address}</Text>
                  {place.photoReference && (
                    <Image
                      source={{ uri: getPhotoUrl(place.photoReference) }}
                      style={styles.placeImage}
                    />
                  )}
                </View>
              </Callout>
            </Marker>
          ))}
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
          >
            <Callout>
              <View>
                <Text style={styles.calloutText}>This is you</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      </View>
      <Text style={styles.bottomText}>Tap on the pins to see more about the location!</Text>
      <Text style={styles.bottomText}>Here are listed gyms, parks, sport courts, and many more!</Text>
      <CustomButton 
        text='Go back'
        type='PRIMARY'
        onPress={handleOnPress}
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#203C3B',
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '6a00',
    textAlign: 'center',
    color: '#203C3B',
    marginVertical: 5,
  },
  loadingStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutContainer: {
    width: 200,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  placeAddress: {
    fontSize: 14,
    color: '#203C3B',
  },
  placeImage: {
    width: '100%',
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  calloutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  userLocationTextContainer: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -100 }],
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    zIndex: 1,
  },
  userLocationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  buttonStyle: {
    width: '60%',
    alignSelf: 'center',
    bottom: -10,
  },
});

export default MapScreen;
