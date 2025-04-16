
import React, { JSX, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSplashVisible ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : (
              <Stack.Screen name="Home" component={HomeScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
