import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MicroDashboardComponent from '../../components/MicroDashboardComponent/MicroDashboardComponent';

const MicronutrientsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Micronutrient Dashboard</Text>
      <MicroDashboardComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MicronutrientsScreen;
