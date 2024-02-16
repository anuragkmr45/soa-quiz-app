import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

import Navigations from './src/navigations/Navigations.jsx';

function App() {
  return (
    <NavigationContainer>
      <Navigations />
    </NavigationContainer>
  );
}

export default App;
