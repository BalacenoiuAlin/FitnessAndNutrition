import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const FoodComponent = ({ name, kcals, proteinIntake, carbIntake, fatIntake, grams, onDelete }) => {
  const proteinGoal = 300;
  const carbGoal = 300;
  const fatGoal = 100;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Icon name="delete-circle" size={35} color="#203C3B" />
        </TouchableOpacity>
        <View style={styles.columnContainer}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.nameStyle}>{grams} g</Text>
        </View>
        <View style={styles.columnContainer}>
        <Text style={styles.caloriesStyle}>Calories</Text>
        <Text style={styles.caloriesStyle}>{kcals}</Text>
        </View>
      </View>
      <View style={styles.macroContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Protein</Text>
          <ProgressBar value={proteinIntake} maxValue={proteinGoal} />
          <Text style={styles.macroValue}>{proteinIntake} g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Carbs</Text>
          <ProgressBar value={carbIntake} maxValue={carbGoal} />
          <Text style={styles.macroValue}>{carbIntake} g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroText}>Fat</Text>
          <ProgressBar value={fatIntake} maxValue={fatGoal} />
          <Text style={styles.macroValue}>{fatIntake} g</Text>
        </View>
      </View>
    </View>
  );
};

FoodComponent.propTypes = {
  name: PropTypes.string.isRequired,
  kcals: PropTypes.number.isRequired,
  proteinIntake: PropTypes.number.isRequired,
  carbIntake: PropTypes.number.isRequired,
  fatIntake: PropTypes.number.isRequired,
  grams: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderColor: '#203C3B',
    width: '95%',
    flexDirection: 'column',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    borderWidth: 0.1,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButton: {
    width: 70,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    left: -3,
  },
  columnContainer:{
    flexDirection: 'column',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  nameStyle: {
    fontSize: 14,
    color: '#203C3B',
    textAlign: 'center',
    left: -2,
  },
  caloriesStyle:{
    fontSize: 14,
    color: '#203C3B',
    textAlign: 'center',
    left: -2,
  },
  macroContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  progressBarContainer: {
    width: '150%',
    height: 5,
    borderRadius: 10,
    backgroundColor: '#efe5e5',
    marginVertical: 5,
    left: -10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#203C3B',
    borderRadius: 10,
  },
  progressPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: '#203C3B',
  },
  macroValue: {
    fontSize: 12,
    color: '#203C3B',
    textAlign: 'center',
    bottom: 15,
  },
  macroText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#203C3B',
  },
});

export default FoodComponent;
