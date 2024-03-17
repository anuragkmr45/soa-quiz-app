import React from 'react';
import { SafeAreaView } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";

import Navigations from './src/navigations/Navigations.jsx';
import { defaultStyling } from './src/constant/styles.js';

function App() {

  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaView style={{ backgroundColor: defaultStyling.dark, flex: 1, flexGrow: 1 }}>
          <Navigations />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
