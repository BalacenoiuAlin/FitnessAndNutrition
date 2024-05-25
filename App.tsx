import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProfileConfigurationScreen from './screens/ProfileConfigurationScreen';
import ProfileConfigurationScreenSecond from './screens/GoalScreen';
import GoalScreen from './screens/GoalScreen';
import GoalTimeScreen from './screens/GoalTimeScreen';
import WeightSelectorScreen from './screens/WeightSelectorScreen';
import ActivityScreen from './screens/ActivityScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      {/* <SignInScreen /> */}
      {/*  <SignUpScreen /> */}
      {/* <ProfileConfigurationScreen /> */}
      {/* <GoalScreen /> */}
      {/* <WeightSelectorScreen /> */}
      {/* <GoalTimeScreen /> */}
      {/* <ActivityScreen /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "F9FBFC"
  },
});

export default App;
