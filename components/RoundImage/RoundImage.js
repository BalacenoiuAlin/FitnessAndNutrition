import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const RoundImage = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
});

export default RoundImage;
