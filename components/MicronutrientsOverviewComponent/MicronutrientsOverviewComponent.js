import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MicronutrientsOverviewComponent = ({ navigation, totalVitamins, totalMinerals }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Micronutrients')}>
      <View style={styles.overallProgressContainer}>
        <Text style={styles.overallText}>Total Vitamins</Text>
        <Text style={styles.overallValue}>{totalVitamins} mg</Text>
      </View>
      <View style={styles.overallProgressContainer}>
        <Text style={styles.overallText}>Total Minerals</Text>
        <Text style={styles.overallValue}>{totalMinerals} mg</Text>
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
});

export default MicronutrientsOverviewComponent;
