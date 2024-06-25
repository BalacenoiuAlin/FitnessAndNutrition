import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MicronutrientsOverviewComponent from '../../components/MicronutrientsOverviewComponent/MicronutrientsOverviewComponent';
import FoodDashboardComponent from '../../components/FoodDashboardComponent/FoodDashboardComponent';
import WaterIntakeComponent from '../../components/WaterIntakeComponent/WaterIntakeComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CalorieScreen = ({ navigation, route }) => {
  const { email } = route.params || {}; // Get the email from route params
  const [currentKcals, setCurrentKcals] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
  });

  const updateMealKcals = async (mealType) => {
    try {
      const storedFoods = await AsyncStorage.getItem(`${mealType}_${email}_addedFoods`);
      if (storedFoods !== null) {
        const foods = JSON.parse(storedFoods);
        const totalKcals = foods.reduce((sum, food) => sum + food.nutrients.ENERC_KCAL, 0);
        setCurrentKcals((prev) => ({ ...prev, [mealType]: totalKcals }));
      } else {
        setCurrentKcals((prev) => ({ ...prev, [mealType]: 0 }));
      }
    } catch (error) {
      console.error(`Error loading ${mealType} calories:`, error);
      setCurrentKcals((prev) => ({ ...prev, [mealType]: 0 }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      updateMealKcals('breakfast');
      updateMealKcals('lunch');
      updateMealKcals('dinner');
      updateMealKcals('snacks');
    }, [email])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DashboardComponent />
      <MicronutrientsOverviewComponent navigation={navigation} />
      <FoodDashboardComponent
        mealType='breakfast'
        currentKcals={currentKcals.breakfast}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'breakfast', email, updateMealKcals })}
      />
      <FoodDashboardComponent
        mealType='lunch'
        currentKcals={currentKcals.lunch}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'lunch', email, updateMealKcals })}
      />
      <FoodDashboardComponent
        mealType='dinner'
        currentKcals={currentKcals.dinner}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'dinner', email, updateMealKcals })}
      />
      <FoodDashboardComponent
        mealType='snacks'
        currentKcals={currentKcals.snacks}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'snacks', email, updateMealKcals })}
      />
      <View style={styles.rowContainer}>
        <WaterIntakeComponent />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <MaterialCommunityIcons name="robot" size={50} color="#203C3B" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 80,
    height: 110,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
  },
});

export default CalorieScreen;