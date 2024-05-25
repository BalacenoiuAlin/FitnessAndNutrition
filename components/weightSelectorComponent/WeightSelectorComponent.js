import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const WeightSelectorComponent = () => {
  const [selectedWeight, setSelectedWeight] = useState(108);
  const weights = Array.from({ length: 100 }, (_, i) => 40 + i);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedWeight(item)} style={styles.itemContainer}>
      <Text style={[styles.itemText, item === selectedWeight && styles.selectedItemText]}>
        {item} KG
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={weights}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={100} 
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#000',
  },
  selectedItemText: {
    color: '#203C3B',
    fontWeight: 'bold',
  },
});

export default WeightSelectorComponent;
