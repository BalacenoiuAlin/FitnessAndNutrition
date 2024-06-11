import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBarComponent from './components/NavigationBarComponent';

function App() {
  return (
    <NavigationContainer>
      <NavigationBarComponent />
    </NavigationContainer>
  );
}

export default App;
