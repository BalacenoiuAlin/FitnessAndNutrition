import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const DashboardComponent = ({ totalCalories, totalProtein, totalCarbs, totalFat }) => {
  const totalGoalCalories = 2000;
  const proteinGoal = 100;
  const carbGoal = 200;
  const fatGoal = 100;

  const ProgressBar = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    const displayProgress = progress > 100 ? 100 : progress;
    return (
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${displayProgress}%` }]} />
        </View>
      </View>
    );
  };

  const ProgressBarCalorie = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    const displayProgress = progress > 100 ? 100 : progress;
    return (
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarCalorieContainer}>
          <View style={[styles.progressBarCalorie, { width: `${displayProgress}%` }]} />
        </View>
      </View>
    );
  };

  // Ensure values are numbers and have default to 0 if undefined
  const safeFixed = (value) => (typeof value === 'number' ? value.toFixed(2) : '0.00');

  return (
    <View style={styles.container}>
      <View style={styles.calorieContainer}>
        <Text style={styles.calorieText}>Calories</Text>
        <ProgressBarCalorie value={totalCalories} maxValue={totalGoalCalories} />
        <Text style={styles.calorieValue}>{safeFixed(totalCalories)} kcal</Text>
      </View>
      <View style={styles.macroContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Protein</Text>
          <ProgressBar value={totalProtein} maxValue={proteinGoal} />
          <Text style={styles.macroValue}>{safeFixed(totalProtein)} g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Carbs</Text>
          <ProgressBar value={totalCarbs} maxValue={carbGoal} />
          <Text style={styles.macroValue}>{safeFixed(totalCarbs)} g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Fat</Text>
          <ProgressBar value={totalFat} maxValue={fatGoal} />
          <Text style={styles.macroValue}>{safeFixed(totalFat)} g</Text>
        </View>
      </View>
    </View>
  );
};

DashboardComponent.propTypes = {
  totalCalories: PropTypes.number.isRequired,
  totalProtein: PropTypes.number.isRequired,
  totalCarbs: PropTypes.number.isRequired,
  totalFat: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: '#203C3B',
    width: '95%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.00,
    elevation: 3,
  },
  calorieContainer: {
    width: '95%',
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  macroContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  calorieText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
  },
  calorieValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#203C3B',
    textAlign: 'center',
  },
  macroText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#203C3B',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '80%',
    height: 5,
    borderRadius: 10,
    backgroundColor: '#efe5e5',
    marginLeft: 10,
    marginVertical: 5,
  },
  progressBarCalorieContainer: {
    width: '100%',
    height: 12,
    borderRadius: 10,
    backgroundColor: '#efe5e5',
    marginVertical: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#203C3B',
    borderRadius: 10,
  },
  progressBarCalorie: {
    height: '100%',
    backgroundColor: '#203C3B',
    borderRadius: 10,
  },
});

export default DashboardComponent;
