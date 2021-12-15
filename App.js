import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import LoginPage from './src/pages/Login';
import RegisterPage from './src/pages/Register';
import StackNavigation from './src/navigations/StackNavigation';

const App = (props) => {

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App;