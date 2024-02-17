import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

import { TokenProvider } from './src/context/TokenContext.jsx'
import Navigations from './src/navigations/Navigations.jsx';

function App() {
  return (
    <NavigationContainer>
      <TokenProvider>
        <Navigations />
      </TokenProvider>
    </NavigationContainer>
  );
}

export default App;
