import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ExerciseBodyPartComponent = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { bodyPart } = route.params;

  useEffect(() => {
    fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '0c5dff1befmsh9149b108eb957d2p10bac9jsn91a8d15cd5c4',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        const filteredData = data.map(({ bodyPart, name, target, gifUrl }) => ({ bodyPart, name, target, gifUrl }));
        setExercises(filteredData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [bodyPart]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#203C3B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDetail}>Body Part: {item.bodyPart}</Text>
      <Text style={styles.itemDetail}>Target: {item.target}</Text>
      <Image source={{ uri: item.gifUrl }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203C3B',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203C3B',
    marginBottom: 10,
  },
  itemDetail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ExerciseBodyPartComponent;
