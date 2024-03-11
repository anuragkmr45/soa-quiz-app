import React from 'react';
import { PaperProvider, DefaultTheme } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";
import { FirestoreProvider } from './src/context/FirestoreContext.js';

import Navigations from './src/navigations/Navigations.jsx';

function App() {

  return (
    <NavigationContainer>
      <FirestoreProvider>
        <PaperProvider>
          <Navigations />
        </PaperProvider>
      </FirestoreProvider>
    </NavigationContainer>
  );
}

export default App;
