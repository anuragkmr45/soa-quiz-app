import React from 'react';
import { PaperProvider, DefaultTheme } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";

import { TokenProvider } from './src/context/TokenContext.jsx'
import Navigations from './src/navigations/Navigations.jsx';

function App() {

  // const theme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     text: 'black',
  //   },
  // };

  return (
    <NavigationContainer>
      <PaperProvider>
        <TokenProvider>
          <Navigations />
        </TokenProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
