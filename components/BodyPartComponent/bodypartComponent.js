import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

const BodyPartComponent = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '0c5dff1befmsh9149b108eb957d2p10bac9jsn91a8d15cd5c4',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        setBodyParts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body Parts</Text>
      <FlatList
        data={bodyParts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
  },
});

export default BodyPartComponent;
