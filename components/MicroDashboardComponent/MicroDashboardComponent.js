import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MicroDashboardComponent = ({ totalVitamins = {}, totalMinerals = {}, onPress }) => {
  const micronutrients = [
    { name: 'Vitamin A', intake: totalVitamins.VITA_RAE || 0, goal: 100, type: 'Vitamin' },
    { name: 'Vitamin C', intake: totalVitamins.VITC || 0, goal: 90, type: 'Vitamin' },
    { name: 'Vitamin D', intake: totalVitamins.VITD || 0, goal: 20, type: 'Vitamin' },
    { name: 'Vitamin E', intake: totalVitamins.VITE || 0, goal: 15, type: 'Vitamin' },
    { name: 'Vitamin K', intake: totalVitamins.VITK1 || 0, goal: 120, type: 'Vitamin' },
    { name: 'Vitamin B1', intake: totalVitamins.THIA || 0, goal: 1.5, type: 'Vitamin' },
    { name: 'Vitamin B2', intake: totalVitamins.RIBF || 0, goal: 1.7, type: 'Vitamin' },
    { name: 'Vitamin B3', intake: totalVitamins.NIA || 0, goal: 20, type: 'Vitamin' },
    { name: 'Vitamin B5', intake: totalVitamins.VITB5 || 0, goal: 5, type: 'Vitamin' },
    { name: 'Vitamin B6', intake: totalVitamins.VITB6A || 0, goal: 2, type: 'Vitamin' },
    { name: 'Vitamin B7', intake: totalVitamins.VITB7 || 0, goal: 30, type: 'Vitamin' },
    { name: 'Vitamin B9', intake: totalVitamins.FOLDFE || 0, goal: 400, type: 'Vitamin' },
    { name: 'Vitamin B12', intake: totalVitamins.VITB12 || 0, goal: 2.4, type: 'Vitamin' },
    { name: 'Calcium', intake: totalMinerals.CA || 0, goal: 1000, type: 'Mineral' },
    { name: 'Iron', intake: totalMinerals.FE || 0, goal: 18, type: 'Mineral' },
    { name: 'Magnesium', intake: totalMinerals.MG || 0, goal: 400, type: 'Mineral' },
    { name: 'Phosphorus', intake: totalMinerals.P || 0, goal: 700, type: 'Mineral' },
    { name: 'Potassium', intake: totalMinerals.K || 0, goal: 3500, type: 'Mineral' },
    { name: 'Sodium', intake: totalMinerals.NA || 0, goal: 1500, type: 'Mineral' },
    { name: 'Zinc', intake: totalMinerals.ZN || 0, goal: 11, type: 'Mineral' },
    { name: 'Copper', intake: totalMinerals.CU || 0, goal: 0.9, type: 'Mineral' },
    { name: 'Manganese', intake: totalMinerals.MN || 0, goal: 2.3, type: 'Mineral' },
    { name: 'Selenium', intake: totalMinerals.SE || 0, goal: 55, type: 'Mineral' },
    { name: 'Iodine', intake: totalMinerals.I || 0, goal: 150, type: 'Mineral' },
    { name: 'Chromium', intake: totalMinerals.CR || 0, goal: 35, type: 'Mineral' },
    { name: 'Molybdenum', intake: totalMinerals.MO || 0, goal: 45, type: 'Mineral' },
    { name: 'Chloride', intake: totalMinerals.CL || 0, goal: 2300, type: 'Mineral' },
    { name: 'Fluoride', intake: totalMinerals.FL || 0, goal: 4, type: 'Mineral' },
    { name: 'Choline', intake: totalMinerals.CHO || 0, goal: 550, type: 'Mineral' },
  ];

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
    <ScrollView contentContainerStyle={styles.container}>
      {micronutrients.map((nutrient, index) => (
        <View key={index} style={styles.nutrientItem}>
          <Text style={styles.nutrientText}>{nutrient.name}</Text>
          <ProgressBar value={nutrient.intake} maxValue={nutrient.goal} />
          <Text style={styles.nutrientValue}>{nutrient.intake} / {nutrient.goal} mg</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: '#203C3B',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
  },
  nutrientItem: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  nutrientText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#203C3B',
    marginTop: 5,
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

export default MicroDashboardComponent;
