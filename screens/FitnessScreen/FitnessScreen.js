import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FitnessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, you are in FitnessScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default FitnessScreen;
