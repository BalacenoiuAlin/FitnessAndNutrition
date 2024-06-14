import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BodyPartComponent from '../../components/BodyPartComponent';

const ExerciseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Screen</Text>
      <BodyPartComponent />
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
});

export default ExerciseScreen;
