import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MicroDashboardComponent from '../../components/MicroDashboardComponent/MicroDashboardComponent';
import CustomButton from '../../components/customButton/customButton';
import { useNavigation } from '@react-navigation/native';


const MicronutrientsScreen = () => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Calorie');
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Micronutrient Dashboard</Text>
      <MicroDashboardComponent />
      <CustomButton
        text= 'Go back'
        type= 'PRIMARY'
        style={styles.buttonStyle}
        onPress={handleOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonStyle:{
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 0,
    bottom: -15,
  }
});

export default MicronutrientsScreen;
