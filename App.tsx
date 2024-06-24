import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileConfigurationScreen from './screens/ProfileConfigurationScreen';
import HeightSelectorScreen from './screens/HeightSelectorScreen';
import GoalScreen from './screens/GoalScreen';
import GoalTimeScreen from './screens/GoalTimeScreen';
import WeightSelectorScreen from './screens/WeightSelectorScreen/WeightSelectorScreen';
import WeightSelectorActualScreen from './screens/WeightSelectorActualScreen';
import NavigationBarComponent from './components/NavigationBarComponent';
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "NavigationBar" : "SignIn"} screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="NavigationBar" component={NavigationBarComponent} />
        </>
      )}
    </Stack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
