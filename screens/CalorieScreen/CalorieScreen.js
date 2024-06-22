import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MicronutrientsOverviewComponent from '../../components/MicronutrientsOverviewComponent/MicronutrientsOverviewComponent';
import FoodDashboardComponent from '../../components/FoodDashboardComponent/FoodDashboardComponent';
import WaterIntakeComponent from '../../components/WaterIntakeComponent/WaterIntakeComponent';

const CalorieScreen = ({ navigation }) => {
  const [currentKcals, setCurrentKcals] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
  });

  const fetchCurrentKcals = async (mealType) => {
    try {
      const storedFoods = await AsyncStorage.getItem(`${mealType}_addedFoods`);
      if (storedFoods !== null) {
        const foods = JSON.parse(storedFoods);
        const totalKcals = foods.reduce((sum, food) => sum + food.nutrients.ENERC_KCAL, 0);
        setCurrentKcals((prev) => ({ ...prev, [mealType]: totalKcals }));
      }
    } catch (error) {
      console.error(`Error loading ${mealType} calories:`, error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCurrentKcals('breakfast');
      fetchCurrentKcals('lunch');
      fetchCurrentKcals('dinner');
      fetchCurrentKcals('snacks');
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DashboardComponent />
      <MicronutrientsOverviewComponent navigation={navigation} />
      <FoodDashboardComponent
        mealType='breakfast'
        currentKcals={currentKcals.breakfast}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'breakfast' })}
      />
      <FoodDashboardComponent
        mealType='lunch'
        currentKcals={currentKcals.lunch}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'lunch' })}
      />
      <FoodDashboardComponent
        mealType='dinner'
        currentKcals={currentKcals.dinner}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'dinner' })}
      />
      <FoodDashboardComponent
        mealType='snacks'
        currentKcals={currentKcals.snacks}
        onPress={() => navigation.navigate('FoodScreen', { mealType: 'snacks' })}
      />
      <WaterIntakeComponent />
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
});

export default CalorieScreen;
