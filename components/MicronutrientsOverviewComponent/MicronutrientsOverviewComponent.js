import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MicronutrientsOverviewComponent = ({ navigation }) => {
  const micronutrients = [
    { name: 'Vitamin A', intake: 70, goal: 100, type: 'Vitamin' },
    { name: 'Vitamin C', intake: 60, goal: 90, type: 'Vitamin' },
    { name: 'Vitamin D', intake: 20, goal: 20, type: 'Vitamin' },
    { name: 'Vitamin E', intake: 15, goal: 15, type: 'Vitamin' },
    { name: 'Vitamin K', intake: 120, goal: 120, type: 'Vitamin' },
    { name: 'Vitamin B1', intake: 1.2, goal: 1.5, type: 'Vitamin' },
    { name: 'Vitamin B2', intake: 1.3, goal: 1.7, type: 'Vitamin' },
    { name: 'Vitamin B3', intake: 16, goal: 20, type: 'Vitamin' },
    { name: 'Vitamin B5', intake: 5, goal: 5, type: 'Vitamin' },
    { name: 'Vitamin B6', intake: 2, goal: 2, type: 'Vitamin' },
    { name: 'Vitamin B7', intake: 30, goal: 30, type: 'Vitamin' },
    { name: 'Vitamin B9', intake: 400, goal: 400, type: 'Vitamin' },
    { name: 'Vitamin B12', intake: 2.4, goal: 2.4, type: 'Vitamin' },
    { name: 'Calcium', intake: 1000, goal: 1000, type: 'Mineral' },
    { name: 'Iron', intake: 18, goal: 18, type: 'Mineral' },
    { name: 'Magnesium', intake: 400, goal: 400, type: 'Mineral' },
    { name: 'Phosphorus', intake: 700, goal: 700, type: 'Mineral' },
    { name: 'Potassium', intake: 3500, goal: 3500, type: 'Mineral' },
    { name: 'Sodium', intake: 1500, goal: 1500, type: 'Mineral' },
    { name: 'Zinc', intake: 11, goal: 11, type: 'Mineral' },
    { name: 'Copper', intake: 0.9, goal: 0.9, type: 'Mineral' },
    { name: 'Manganese', intake: 2.3, goal: 2.3, type: 'Mineral' },
    { name: 'Selenium', intake: 55, goal: 55, type: 'Mineral' },
    { name: 'Iodine', intake: 150, goal: 150, type: 'Mineral' },
    { name: 'Chromium', intake: 35, goal: 35, type: 'Mineral' },
    { name: 'Molybdenum', intake: 45, goal: 45, type: 'Mineral' },
    { name: 'Chloride', intake: 2300, goal: 2300, type: 'Mineral' },
    { name: 'Fluoride', intake: 4, goal: 4, type: 'Mineral' },
    { name: 'Choline', intake: 550, goal: 550, type: 'Mineral' },
  ];

  const vitaminNutrients = micronutrients.filter(nutrient => nutrient.type === 'Vitamin');
  const mineralNutrients = micronutrients.filter(nutrient => nutrient.type === 'Mineral');

  const totalVitaminIntake = vitaminNutrients.reduce((total, nutrient) => total + nutrient.intake, 0);
  const totalVitaminGoal = vitaminNutrients.reduce((total, nutrient) => total + nutrient.goal, 0);

  const totalMineralIntake = mineralNutrients.reduce((total, nutrient) => total + nutrient.intake, 0);
  const totalMineralGoal = mineralNutrients.reduce((total, nutrient) => total + nutrient.goal, 0);

  const ProgressBar = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    return (
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Micronutrients')}>
      <View style={styles.overallProgressContainer}>
        <Text style={styles.overallText}>Vitamins</Text>
        <ProgressBar value={totalVitaminIntake} maxValue={totalVitaminGoal} />
        <Text style={styles.overallValue}>{totalVitaminIntake} / {totalVitaminGoal} mg</Text>
      </View>
      <View style={styles.overallProgressContainer}>
        <Text style={styles.overallText}>Minerals</Text>
        <ProgressBar value={totalMineralIntake} maxValue={totalMineralGoal} />
        <Text style={styles.overallValue}>{totalMineralIntake} / {totalMineralGoal} mg</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: '#203C3B',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.00,
    padding: 10,
  },
  overallProgressContainer: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  overallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
  },
  overallValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#203C3B',
    marginTop: 5,
    textAlign: 'center',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressBarContainer: {
    width: '100%',
    height: 5,
    borderRadius: 10,
    backgroundColor: '#efe5e5',
    marginVertical: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#203C3B',
    borderRadius: 10,
  },
});

export default MicronutrientsOverviewComponent;
