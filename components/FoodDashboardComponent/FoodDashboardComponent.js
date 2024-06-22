import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const getMealIcon = (mealType) => {
  switch (mealType.toLowerCase()) {
    case 'breakfast':
      return 'food-croissant';
    case 'lunch':
      return 'food';
    case 'dinner':
      return 'food-variant';
    case 'snacks':
      return 'food-apple';
    default:
      return 'food';
  }
};

const FoodDashboardComponent = ({ mealType, currentKcals, totalKcals }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Food', { mealType, currentKcals, totalKcals });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Icon name={getMealIcon(mealType)} size={40} color="#203C3B" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mealType}>{mealType}</Text>
        <Text style={styles.kcals}>{currentKcals} kcal</Text>
      </View>
      <View style={styles.addButtonContainer}>
        <Icon name="plus-circle" size={35} color="#203C3B" />
      </View>
    </TouchableOpacity>
  );
};

FoodDashboardComponent.propTypes = {
  mealType: PropTypes.string.isRequired,
  currentKcals: PropTypes.number.isRequired,
  totalKcals: PropTypes.number.isRequired,
};

FoodDashboardComponent.defaultProps = {
  mealType: 'meal',
  currentKcals: 0,
  totalKcals: 0,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderColor: '#203C3B',
    width: '95%',
    flexDirection: 'row',
    marginVertical: 12.5,
    marginHorizontal: 10,
    borderRadius: 15,
    borderWidth: 0.1,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#203C3B',
    marginTop: 20,
  },
  kcals: {
    fontSize: 13,
    color: '#888',
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    marginRight: 10,
    width: 70,
    height: 70,
  },
});

export default FoodDashboardComponent;
