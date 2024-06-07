import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import KnowledgeComponent from './components/KnowledgeComponent';
import InformativeComponent from './components/InformativeComponent';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Knowledge">
        <Stack.Screen 
          name="Knowledge" 
          component={KnowledgeComponent} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Informative" 
          component={InformativeComponent} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
