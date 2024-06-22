import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from '../customButton/customButton';

const FoodDetailComponent = ({ food, onAddFood }) => {
  const [selectedGrams, setSelectedGrams] = useState('');

  if (!food) {
    return null;
  }

  const { label, nutrients } = food.food;
  const { ENERC_KCAL, PROCNT, FAT, CHOCDF, FIBTG } = nutrients;

  const scaleNutrient = (value) => {
    const grams = parseFloat(selectedGrams);
    return isNaN(grams) || grams === 0 ? 0 : (value * grams) / 100;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Cantitatea:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={selectedGrams}
          onChangeText={(text) => setSelectedGrams(text)}
          placeholder="0"
        />
        <Text style={styles.gramsLabel}>Quantity is in grams</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detail}>Calories</Text>
          <Text style={styles.detailValue}>{scaleNutrient(ENERC_KCAL).toFixed(2)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detail}>Proteins</Text>
          <Text style={styles.detailValue}>{scaleNutrient(PROCNT).toFixed(2)} g</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detail}>Carbs</Text>
          <Text style={styles.detailValue}>{scaleNutrient(CHOCDF).toFixed(2)} g</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detail}>Fats</Text>
          <Text style={styles.detailValue}>{scaleNutrient(FAT).toFixed(2)} g</Text>
        </View>
      </View>
      <CustomButton 
        text='Add food'
        type='PRIMARY'
        onPress={() => onAddFood(food, selectedGrams)}
        style={styles.buttonStyle}
      />
    </View>
  );
};

FoodDetailComponent.propTypes = {
  food: PropTypes.object.isRequired,
  onAddFood: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#203C3B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#203C3B',
  },
  input: {
    height: 30,
    borderColor: '#203C3B',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 60,
    marginRight: 40,
    color: '#203C3B',
    textAlign: 'center',
  },
  gramsLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: '#203C3B',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailItem: {
    alignItems: 'center',
  },
  detail: {
    fontSize: 14,
    color: '#203C3B',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#203C3B',
  },
  buttonStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    width: '50%',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default FoodDetailComponent;
