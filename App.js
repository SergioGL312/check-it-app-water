import React, { useEffect } from 'react';
import { GlobalProvider } from './src/wrappers/GlobalState';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './src/constants/navigation.constants';
import FullScreenAnimation from './src/screens/FullScreenAnimation';
import Navigation from "./src/wrappers/Navigation";

const Stack = createStackNavigator();

export default function App() {

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={ROUTES.splash}
            component={FullScreenAnimation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.main}
            component={Navigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
