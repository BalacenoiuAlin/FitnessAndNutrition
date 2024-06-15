import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BodyPartComponent from '../../components/BodyPartComponent';

const ExerciseScreen = () => {
  return (
    <View style={styles.container}>
      <BodyPartComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203C3B',
  },
});

export default ExerciseScreen;
