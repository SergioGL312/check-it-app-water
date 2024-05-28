import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/wrappers/Navigation"

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Simula una carga de x segundos
      SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
