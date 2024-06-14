import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import CustomButton from '../../components/customButton/customButton';
import MapPhoto from '../../assets/images/MapImage.jpg';
import ExercisePhoto from '../../assets/images/ExercisePhoto.jpg';

const FitnessScreen = () => {
  const handleMap = () => {
    console.log('Map button pressed');
  };

  const handleExercise = () => {
    console.log('Exercise button pressed');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={MapPhoto} style={styles.topContainer} imageStyle={styles.imageBackground}>
        <Text style={styles.textStyle}>Here you can find all locations in your city where you can train for free or paid!</Text>
        <Text style={styles.infoTextStyle}>Press to continue</Text>
        <CustomButton
          onPress={handleMap}
          type="TERTIARY"
          style={styles.buttonStyle}
        />
      </ImageBackground>
      <ImageBackground source={ExercisePhoto} style={styles.bottomContainer} imageStyle={styles.imageBackground}>
        <Text style={styles.textStyle}>Here you can find a various number of exercises with description and visually represented!</Text>
        <Text style={styles.infoTextStyle}>Press to continue</Text>
        <CustomButton
          onPress={handleExercise}
          type="TERTIARY"
          style={styles.buttonStyle}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 50,
    marginBottom: 30,
    marginVertical: 20,
    borderRadius: 20,
    position: 'relative',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 30,
    borderRadius: 20,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  buttonStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  textStyle:{
    pointerEvents: 'none',
    alignContent: 'flex-start',
    color: 'white',
    bottom: 10,
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
  },
  infoTextStyle:{
    pointerEvents: 'none',
    alignContent: 'center',
    color: 'white',
    top: 170,
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
  }
});

export default FitnessScreen;
