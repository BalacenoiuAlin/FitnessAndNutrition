import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MicronutrientsOverviewComponent from '../../components/MicronutrientsOverviewComponent/MicronutrientsOverviewComponent';

const CalorieScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [addedFoods, setAddedFoods] = useState([]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get('https://api.edamam.com/auto-complete', {
        params: {
          app_id: '748bcfa6',
          app_key: '03879e091c37112bb59f5a5b2b2d3f66',
          q: query,
          limit: 10,
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
        params: {
          app_id: '748bcfa6',
          app_key: '03879e091c37112bb59f5a5b2b2d3f66',
          ingr: query,
          'nutrition-type': 'logging',
        },
      });
      setData(response.data.parsed);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchQuery(suggestion);
    fetchData(suggestion);
  };

  const handleAddFood = (food) => {
    setAddedFoods([...addedFoods, food]);
    setData([]);
    setSearchQuery('');
  };

  const formatNumber = (num) => {
    return num ? num.toFixed(1) : 'N/A';
  };

  const renderItem = ({ item }) => {
    const nutrients = item.food.nutrients;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Name: {item.food.label}</Text>
        <Text>Brand: {item.food.brand || 'N/A'}</Text>
        {Object.entries(nutrients).map(([key, value]) => (
          <Text key={key}>{key}: {formatNumber(value)}</Text>
        ))}
        <Button title="Add Food" onPress={() => handleAddFood(item.food)} />
      </View>
    );
  };

  const renderAddedFoodItem = ({ item }) => {
    const nutrients = item.nutrients;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Name: {item.label}</Text>
        <Text>Brand: {item.brand || 'N/A'}</Text>
        {Object.entries(nutrients).map(([key, value]) => (
          <Text key={key}>{key}: {formatNumber(value)}</Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <DashboardComponent />
      <MicronutrientsOverviewComponent navigation={navigation} />
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity key={index} onPress={() => handleSuggestionPress(suggestion)}>
              <Text style={styles.suggestion}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#203C3B" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.food.foodId}
        />
      )}
      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardTitle}>Added Foods</Text>
        <FlatList
          data={addedFoods}
          renderItem={renderAddedFoodItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    height: 40,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#203C3B',
    borderRadius: 5,
    width: '90%',
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    width: '80%',
    zIndex: 1,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dashboardContainer: {
    backgroundColor: '#203C3B',
    marginVertical: 30,
    width: '90%',
  },
  dashboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CalorieScreen;
