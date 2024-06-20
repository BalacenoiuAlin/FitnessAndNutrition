import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MicronutrientsOverviewComponent from '../../components/MicronutrientsOverviewComponent/MicronutrientsOverviewComponent';
import FoodDashboardComponent from '../../components/FoodDashboardComponent/FoodDashboardComponent';
import WaterIntakeComponent from '../../components/WaterIntakeComponent/WaterIntakeComponent';

const CalorieScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DashboardComponent />
      <MicronutrientsOverviewComponent navigation={navigation} />
      <FoodDashboardComponent mealType='breakfast' currentKcals={300} totalKcals={500} />
      <FoodDashboardComponent mealType='lunch' currentKcals={450} totalKcals={600} />
      <FoodDashboardComponent mealType='dinner' currentKcals={400} totalKcals={700} />
      <FoodDashboardComponent mealType='snacks' currentKcals={200} totalKcals={300} />
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
