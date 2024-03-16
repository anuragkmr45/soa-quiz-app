import React from 'react';
import { PaperProvider, DefaultTheme } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";

import Navigations from './src/navigations/Navigations.jsx';

function App() {

  return (
    <NavigationContainer>
      <PaperProvider>
        <Navigations />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
