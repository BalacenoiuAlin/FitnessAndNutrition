import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../customButton/customButton';

const ExerciseBodyPartComponent = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { bodyPart } = route.params;

  useEffect(() => {
    fetchExercises();
  }, [bodyPart]);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
        method: 'GET',
        headers: {
          //'x-rapidapi-key': '394b133098mshc80e29dadfe2e78p1df839jsn843be704bee8',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid API key');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      if (!data) {
        throw new Error('No data returned from API');
      }

      const filteredData = data.map(({ id, bodyPart, name, target, gifUrl }) => ({ id, bodyPart, name, target, gifUrl }));
      setExercises(filteredData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleContainerPress = (item) => {
    navigation.navigate('InDepthExercise', { exercise: item });
  };

  const handleOnPress = () => {
    navigation.navigate('Exercise');
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerStyle}>Here you can go through {bodyPart} exercises!</Text>
      <Text style={styles.subHeaderStyle}>Swipe down or press on desired exercise to expand it!</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <CustomButton
        text='Go back'
        type='PRIMARY'
        onPress={handleOnPress}
        style={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
      />
      <Text style={styles.overlayText}>Go Back</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleContainerPress(item)}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Image source={{ uri: item.gifUrl }} style={styles.image} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemDetail}>Body Part: {item.bodyPart}</Text>
        <Text style={styles.itemDetail}>Target: {item.target}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#203C3B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={exercises}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name + index.toString()}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203C3B',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#203C3B',
    textAlign: 'center',
    marginVertical: 40,
  },
  subHeaderStyle: {
    fontSize: 14,
    fontWeight: '450',
    color: '#203C3B',
    textAlign: 'center',
    marginBottom: 25,
    marginHorizontal: 10,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#203C3B',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  itemDetail: {
    fontSize: 16,
    color: '#203C3B',
    marginHorizontal: 30,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  image: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonStyle: {
    width: '60%',
    color: '#203C3B',
    backgroundColor: '#FFFFFF',
  },
  contentContainerStyle: {
    flexGrow: 1,
    width: Dimensions.get('window').width,
  },
  overlayText: {
    position: 'absolute',
    color: '#203C3B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExerciseBodyPartComponent;
