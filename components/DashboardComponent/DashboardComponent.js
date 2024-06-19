import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardComponent = () => {
  const totalCalories = 2117;
  const eatenCalories = 1291;
  const burnedCalories = 244;
  const remainingCalories = totalCalories - eatenCalories + burnedCalories;

  const carbIntake = 206;
  const carbGoal = 258;

  const proteinIntake = 35;
  const proteinGoal = 103;

  const fatIntake = 32;
  const fatGoal = 68;

  const ProgressBar = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    return (
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPercentage}></Text>
      </View>
    );
  };

  const ProgressBarCalorie = ({ value, maxValue }) => {
    const progress = (value / maxValue) * 100;
    return (
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarCalorieContainer}>
          <View style={[styles.progressBarCalorie, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPercentage}></Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.calorieContainer}>
        <Text style={styles.calorieText}>Calories</Text>
        <ProgressBarCalorie value={eatenCalories} maxValue={totalCalories} />
        <Text style={styles.calorieValue}>{eatenCalories} / {totalCalories} kcal</Text>
      </View>
      <View style={styles.macroContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Protein</Text>
          <ProgressBar value={proteinIntake} maxValue={proteinGoal} />
          <Text style={styles.macroValue}>{proteinIntake} / {proteinGoal} g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Carbs</Text>
          <ProgressBar value={carbIntake} maxValue={carbGoal} />
          <Text style={styles.macroValue}>{carbIntake} / {carbGoal} g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Fat</Text>
          <ProgressBar value={fatIntake} maxValue={fatGoal} />
          <Text style={styles.macroValue}>{fatIntake} / {fatGoal} g</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#203C3B',
    width: '95%',
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
  calorieText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
  },
  calorieValue:{
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
  progressPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: '#203C3B',
  },
});

export default DashboardComponent;
