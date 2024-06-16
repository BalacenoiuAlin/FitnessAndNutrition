import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExerciseBodyPartComponent from '../../components/ExerciseBodyPartComponent';

const ExerciseInfoScreen = () => {
  return (
    <View style={styles.container}>
      <ExerciseBodyPartComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#203C3B',
  },
});

export default ExerciseInfoScreen;
