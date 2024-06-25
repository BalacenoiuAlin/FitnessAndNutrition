import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/customButton/customButton';
import FoodComponent from '../../components/FoodComponent/FoodComponent';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import FoodDetailComponent from '../../components/FoodDetailComponent/FoodDetailComponent';
import { searchFoods, getAutocompleteSuggestions } from '../../services/apiFoodServices';
import Breakfast from '../../assets/images/breakfast.jpg';
import Lunch from '../../assets/images/lunch.jpg';
import Dinner from '../../assets/images/dinner.jpg';
import Snacks from '../../assets/images/snacks.webp';
import MicronutrientsOverviewComponent from '../../components/MicronutrientsOverviewComponent/MicronutrientsOverviewComponent';
import BarcodeScannerComponent from '../../components/BarcodeScannerComponent/BarcodeScannerComponent';

const vitaminNutrients = ['VITA_RAE', 'VITC', 'VITD', 'VITE', 'VITK1', 'THIA', 'RIBF', 'NIA', 'VITB6A', 'FOLDFE', 'VITB12', 'VITB7', 'VITB5'];
const mineralNutrients = ['CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'SE', 'I', 'CR', 'MO', 'CL'];

const getMealImage = (mealType) => {
  switch (mealType.toLowerCase()) {
    case 'breakfast':
      return Breakfast;
    case 'lunch':
      return Lunch;
    case 'dinner':
      return Dinner;
    case 'snacks':
      return Snacks;
    default:
      return null;
  }
};

const FoodScreen = ({ route }) => {
  const { mealType, email, updateMealKcals } = route.params;
  const mealImage = getMealImage(mealType);
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [addedFoods, setAddedFoods] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchFoods(mealType);
        setFoodData(result);
      } catch (error) {
        console.error('Error fetching food data:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadStoredFoods = async () => {
      try {
        const storedFoods = await AsyncStorage.getItem(`${mealType}_${email}_addedFoods`);
        if (storedFoods !== null) {
          setAddedFoods(JSON.parse(storedFoods));
        }
      } catch (error) {
        console.error('Error loading stored foods:', error);
      }
    };

    fetchData();
    loadStoredFoods();
  }, [mealType, email]);

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const storeFoods = async () => {
      try {
        await AsyncStorage.setItem(`${mealType}_${email}_addedFoods`, JSON.stringify(addedFoods));
        if (updateMealKcals) {
          updateMealKcals(mealType); // Update the calories after storing foods
        }
      } catch (error) {
        console.error('Error storing foods:', error);
      }
    };

    storeFoods();
  }, [addedFoods, mealType, email, updateMealKcals]);

  const handleSearch = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const result = await searchFoods(searchQuery);
      setFoodData(result);
      setSuggestions([]);
      setSelectedFood(result[0]);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerSearch = async () => {
    setSearchQuery('');
    setLoading(true);

    try {
      const result = await searchFoods('');
      setFoodData(result);
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutocomplete = async (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      try {
        const result = await getAutocompleteSuggestions(query);
        setSuggestions(result.slice(0, 3));
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = async (suggestion) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const result = await searchFoods(suggestion);
      setFoodData(result);
      setSuggestions([]);
      setSearchQuery(suggestion);
      setSelectedFood(result[0]);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodPress = (food) => {
    Keyboard.dismiss();
    setSelectedFood(food);
  };

  const handleOnPress = () => {
    navigation.navigate('Calorie');
  };

  const handleAddFood = async (food, grams) => {
    const roundToTwoDecimals = (value) => Math.round(value * 100) / 100;
    const updatedFood = {
      ...food,
      grams,
      nutrients: {
        CA: food.food.nutrients.CA ? roundToTwoDecimals((food.food.nutrients.CA * grams) / 100) : 0,
        CHOCDF: roundToTwoDecimals((food.food.nutrients.CHOCDF * grams) / 100),
        CHOCDF_net: food.food.nutrients['CHOCDF.net'],
        CHOLE: food.food.nutrients.CHOLE,
        ENERC_KCAL: roundToTwoDecimals((food.food.nutrients.ENERC_KCAL * grams) / 100),
        FAMS: food.food.nutrients.FAMS,
        FAPU: food.food.nutrients.FAPU,
        FASAT: food.food.nutrients.FASAT,
        FATRN: food.food.nutrients.FATRN,
        FIBTG: food.food.nutrients.FIBTG,
        FOLDFE: food.food.nutrients.FOLDFE,
        FOLFD: food.food.nutrients.FOLFD,
        FOLAC: food.food.nutrients.FOLAC,
        FE: food.food.nutrients.FE ? roundToTwoDecimals((food.food.nutrients.FE * grams) / 100) : 0,
        MG: food.food.nutrients.MG ? roundToTwoDecimals((food.food.nutrients.MG * grams) / 100) : 0,
        NIA: food.food.nutrients.NIA,
        P: food.food.nutrients.P,
        K: food.food.nutrients.K ? roundToTwoDecimals((food.food.nutrients.K * grams) / 100) : 0,
        PROCNT: roundToTwoDecimals((food.food.nutrients.PROCNT * grams) / 100),
        RIBF: food.food.nutrients.RIBF,
        NA: food.food.nutrients.NA,
        SUGAR: food.food.nutrients.SUGAR,
        THIA: food.food.nutrients.THIA,
        FAT: roundToTwoDecimals((food.food.nutrients.FAT * grams) / 100),
        VITA_RAE: food.food.nutrients.VITA_RAE ? roundToTwoDecimals((food.food.nutrients.VITA_RAE * grams) / 100) : 0,
        VITB12: food.food.nutrients.VITB12 ? roundToTwoDecimals((food.food.nutrients.VITB12 * grams) / 100) : 0,
        VITB6A: food.food.nutrients.VITB6A ? roundToTwoDecimals((food.food.nutrients.VITB6A * grams) / 100) : 0,
        VITC: food.food.nutrients.VITC ? roundToTwoDecimals((food.food.nutrients.VITC * grams) / 100) : 0,
        VITD: food.food.nutrients.VITD ? roundToTwoDecimals((food.food.nutrients.VITD * grams) / 100) : 0,
        VITK1: food.food.nutrients.VITK1 ? roundToTwoDecimals((food.food.nutrients.VITK1 * grams) / 100) : 0,
        ZN: food.food.nutrients.ZN ? roundToTwoDecimals((food.food.nutrients.ZN * grams) / 100) : 0,
      },
    };

    setAddedFoods((prevFoods) => [...prevFoods, updatedFood]);
    setSelectedFood(null);
    setSearchQuery('');
    await triggerSearch();
    if (updateMealKcals) {
      updateMealKcals(mealType); // Update the calories after adding food
    }
  };

  const handleDeleteFood = async (index) => {
    const newFoods = addedFoods.filter((_, i) => i !== index);
    setAddedFoods(newFoods);
    await AsyncStorage.setItem(`${mealType}_${email}_addedFoods`, JSON.stringify(newFoods));
    if (updateMealKcals) {
      updateMealKcals(mealType); // Update the calories after deleting food
    }
  };

  const calculateTotalNutrients = (nutrient) => {
    return addedFoods.reduce((acc, food) => {
      const value = food.nutrients ? food.nutrients[nutrient] || 0 : 0;
      return acc + value;
    }, 0);
  };

  const calculateTotalNutrientsByCategory = (nutrientList) => {
    const totals = {};
    nutrientList.forEach(nutrient => {
      totals[nutrient] = calculateTotalNutrients(nutrient);
    });
    return totals;
  };

  const totalVitamins = calculateTotalNutrientsByCategory(vitaminNutrients);
  const totalMinerals = calculateTotalNutrientsByCategory(mineralNutrients);

  const totalVitaminsSum = Object.values(totalVitamins).reduce((a, b) => a + b, 0);
  const totalMineralsSum = Object.values(totalMinerals).reduce((a, b) => a + b, 0);

  const handleBarcodeScanned = async (data) => {
    setBarcode(data);
    setModalVisible(false);
    setLoading(true);
    try {
      const result = await searchFoods(data, 'barcode');
      console.log('Barcode Search Result:', result);
      setFoodData(result);
      setSuggestions([]);
      if (result.length > 0) {
        setSelectedFood(result[0]);
      } else {
        console.log('Food not found in the database');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Food not found for the provided barcode.');
        alert('Food not found for the provided barcode.');
      } else {
        console.error('Error fetching food data by barcode:', error);
        alert('An error occurred while fetching food data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByBarcode = async (barcode) => {
    setLoading(true);
    try {
      const result = await searchFoods(barcode);
      setFoodData(result);
      setSuggestions([]);
      if (result.length > 0) {
        setSelectedFood(result[0]);
      } else {
        console.log('Food not found in the database');
      }
    } catch (error) {
      console.error('Error fetching food data by barcode:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {mealImage && <Image source={mealImage} style={styles.image} />}
          <Text style={styles.title}>{mealType}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for foods..."
              placeholderTextColor="#203C3B"
              value={searchQuery}
              onChangeText={handleAutocomplete}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.barcodeScannerText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
          {suggestions.length > 0 && (
            <View style={styles.suggestionsList}>
              {suggestions.map((item, index) => (
                <TouchableOpacity key={index.toString()} onPress={() => handleSuggestionPress(item)}>
                  <Text style={styles.suggestionItem}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <ScrollView>
            {loading ? (
              <ActivityIndicator size="large" color="#203C3B" />
            ) : selectedFood ? (
              <FoodDetailComponent food={selectedFood} onAddFood={handleAddFood} />
            ) : (
              foodData.map((food, index) => (
                <TouchableOpacity key={index} onPress={() => handleFoodPress(food)}>
                  <FoodComponent
                    key={index}
                    name={food.food.label}
                    kcals={food.food.nutrients.ENERC_KCAL}
                    proteinIntake={food.food.nutrients.PROCNT}
                    carbIntake={food.food.nutrients.CHOCDF}
                    fatIntake={food.food.nutrients.FAT}
                    grams={food.grams}
                    onDelete={() => handleDeleteFood(index)}
                    nutrients={food.food.nutrients}
                  />
                </TouchableOpacity>
              ))
            )}
            {addedFoods.map((food, index) => (
              <FoodComponent
                key={index}
                name={food.food.label}
                kcals={food.nutrients.ENERC_KCAL}
                proteinIntake={food.nutrients.PROCNT}
                carbIntake={food.nutrients.CHOCDF}
                fatIntake={food.nutrients.FAT}
                grams={food.grams}
                onDelete={() => handleDeleteFood(index)}
                nutrients={food.nutrients}
              />
            ))}
            <View style={styles.infoContainer}>
              <DashboardComponent
                totalCalories={calculateTotalNutrients('ENERC_KCAL')}
                totalProtein={calculateTotalNutrients('PROCNT')}
                totalCarbs={calculateTotalNutrients('CHOCDF')}
                totalFat={calculateTotalNutrients('FAT')}
              />
              <MicronutrientsOverviewComponent
                navigation={navigation}
                totalVitamins={totalVitaminsSum}
                totalMinerals={totalMineralsSum}
              />
            </View>
            <CustomButton text='Go Back' type='PRIMARY' onPress={handleOnPress} style={styles.buttonStyle} />
          </ScrollView>
          {modalVisible && (
            <BarcodeScannerComponent
              onBarcodeScanned={handleBarcodeScanned}
              onClose={() => setModalVisible(false)}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignContent: 'center',
  },
  topContainer: {
    flex: 0.8,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 320,
    marginLeft: 10,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
    position: 'absolute',
    color: 'white',
  },
  infoContainer: {
    top: -40,
  },
  buttonStyle: {
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: 25,
  },
  searchContainer: {
    height: 40,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#203C3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    justifyContent: 'center',
  },
  searchInput: {
    height: '100%',
    paddingHorizontal: 10,
    bottom: -15,
    color: '#203C3B',
  },
  suggestionsList: {
    maxHeight: 150,
    borderColor: '#203C3B',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#203C3B',
    borderBottomWidth: 1,
  },
  barcodeScannerText: {
    color: '#203C3B',
    width: 100,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    position: 'relative',
    top: -25,
    right: -280,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  camera: {
    width: '80%',
    height: '80%',
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  closeButtonText: {
    color: '#203C3B',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FoodScreen;
