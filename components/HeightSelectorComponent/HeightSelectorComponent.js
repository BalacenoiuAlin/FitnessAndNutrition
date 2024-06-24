import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const HeightSelectorComponent = ({ setHeight }) => {
  const [selectedHeight, setSelectedHeight] = useState(108);
  const heights = Array.from({ length: 100 }, (_, i) => 130 + i);

  const handleSelectHeight = (height) => {
    setSelectedHeight(height);
    setHeight(height); // Call the callback function to pass the selected height to the parent component
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectHeight(item)} style={styles.itemContainer}>
      <Text style={[styles.itemText, item === selectedHeight && styles.selectedItemText]}>
        {item} CM
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={heights}
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

export default HeightSelectorComponent;
