import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import CalorieScreen from '../../screens/CalorieScreen';
import EducativeScreen from '../../screens/EducativeScreen';
import FitnessScreen from '../../screens/FitnessScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import InformativeScreen from '../../screens/InformativeScreen';
import ExerciseScreen from '../../screens/ExerciseScreen';
import MapScreen from '../../screens/MapScreen';
import ExerciseInfoScreen from '../../screens/ExerciseInfoScreen';
import InDepthExerciseScreen from '../../screens/InDepthExerciseScreen';
import MicronutrientsScreen from '../../screens/MicronutrientsScreen';
import FoodScreen from '../../screens/FoodScreen';
import BarcodeScannerComponent from '../BarcodeScannerComponent/BarcodeScannerComponent';
import ChatbotScreen from '../../screens/ChatbotScreen';

const Tab = createBottomTabNavigator();
const EducativeStack = createStackNavigator();
const FitnessStack = createStackNavigator();
const CalorieStack = createStackNavigator();

const CalorieStackNavigator = ({ route }) => {
  const { email } = route.params || {};
  return (
    <CalorieStack.Navigator>
      <CalorieStack.Screen
        name="Calorie"
        component={CalorieScreen}
        initialParams={{ email }}
        options={{ headerShown: false }}
      />
      <CalorieStack.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{ headerShown: false }}
      />
      <CalorieStack.Screen
        name="Micronutrients"
        component={MicronutrientsScreen}
        options={{ headerShown: false }}
      />
      <CalorieStack.Screen
        name="Food"
        component={FoodScreen}
        options={{ headerShown: false }}
      />
      <CalorieStack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerComponent}
        options={{ headerShown: false }}
      />
    </CalorieStack.Navigator>
  );
};

const EducativeStackNavigator = () => {
  return (
    <EducativeStack.Navigator>
      <EducativeStack.Screen
        name="Educative"
        component={EducativeScreen}
        options={{ headerShown: false }}
      />
      <EducativeStack.Screen
        name="Informative"
        component={InformativeScreen}
        options={{ headerShown: false }}
      />
    </EducativeStack.Navigator>
  );
};

const FitnessStackNavigator = () => {
  return (
    <FitnessStack.Navigator>
      <FitnessStack.Screen 
        name="Fitness"
        component={FitnessScreen}
        options={{ headerShown: false }}
      />
      <FitnessStack.Screen 
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <FitnessStack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{ headerShown: false }}
      />
      <FitnessStack.Screen
        name="ExerciseInfo"
        component={ExerciseInfoScreen}
        options={{ headerShown: false }}
      />
      <FitnessStack.Screen
        name="InDepthExercise"
        component={InDepthExerciseScreen}
        options={{ headerShown: false }}
      />
    </FitnessStack.Navigator>
  );
};

const NavigationBarComponent = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Calorie') {
            iconName = focused ? 'flame' : 'flame-outline';
          } else if (route.name === 'Educative') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Fitness') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#203C3B',
        tabBarInactiveTintColor: '#203C3B',
        tabBarStyle: { paddingBottom: 25, paddingTop: 15, height: 80 },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Calorie" component={CalorieStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Educative" component={EducativeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Fitness" component={FitnessStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default NavigationBarComponent;