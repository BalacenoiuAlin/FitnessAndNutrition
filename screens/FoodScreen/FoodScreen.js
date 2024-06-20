import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Breakfast from '../../assets/images/breakfast.jpg';
import Lunch from '../../assets/images/lunch.jpg';
import Dinner from '../../assets/images/dinner.jpg';
import Snacks from '../../assets/images/snacks.webp';
import CustomButton from '../../components/customButton/customButton';
import FoodComponent from '../../components/FoodComponent/FoodComponent'
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MicronutrientsOverviewComponent from '../../components/MicronutrientsOverviewComponent/MicronutrientsOverviewComponent';
import { useNavigation } from '@react-navigation/native';

const getMealImage = (mealType) => {
  switch (mealType.toLowerCase()) {
    case 'breakfast':
      return Breakfast;
    case 'lunch':
      return Lunch;
    case 'dinner':
      return Dinner;
    case 'snacks':
      return Snacks;
    default:
      return null;
  }
};

const FoodScreen = ({ route }) => {
  const { mealType, currentKcals, totalKcals } = route.params;
  const mealImage = getMealImage(mealType);

  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Calorie');
  };

  const handleVitaminPress = () => {
    navigation.navigate('Food');
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {mealImage && <Image source={mealImage} style={styles.image} />}
      </View>
      <ScrollView style={styles.bottomContainer}>
        <View style={styles.headerContainer}>
        <Text style={styles.title}>{mealType}</Text>
        <CustomButton
          text='+'
          type='PRIMARY'
          style={styles.addButtonStyle}
        />
        </View>
        <FoodComponent
        />
        <DashboardComponent
        />
        <MicronutrientsOverviewComponent navigation={navigation}
          onPress={handleVitaminPress}
        />
        <CustomButton
          text='Go Back'
          type='PRIMARY'
          onPress={handleOnPress}
          style={styles.buttonStyle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerContainer :{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginHorizontal: -40,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    flex: 0.8,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'capitalize',
    marginTop: 17,
    color: '#203C3B',
    marginRight: 120,
  },
  buttonStyle: {
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: 10,
  },
  addButtonStyle: {
    width: 45,
    height: 45,
    textAlign: 'right',
    alignSelf: 'flex-end',
    borderRadius: 50,
    textAlign: 'center',
  }
});

export default FoodScreen;
