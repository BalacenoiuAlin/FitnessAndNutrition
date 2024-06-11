import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CalorieScreen from '../../screens/CalorieScreen';
import EducativeScreen from '../../screens/EducativeScreen';
import FitnessScreen from '../../screens/FitnessScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Calorie" component={CalorieScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Educative" component={EducativeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Fitness" component={FitnessScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default NavigationBarComponent;
