import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

jest.useFakeTimers();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => <>{children}</>,
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: ({ children }: any) => <>{children}</>,
    }),
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({ children }: any) => <>{children}</>,
  };
});

jest.mock('../src/screens/SplashScreen', () => () => <Text>Mock SplashScreen</Text>);
jest.mock('../src/screens/HomeScreen', () => () => <Text>Mock HomeScreen</Text>);

describe('App.tsx', () => {
  it('renders SplashScreen first and then navigates to HomeScreen', async () => {
    const { getByText, queryByText } = render(<App />);

    expect(getByText('Mock SplashScreen')).toBeTruthy();

    jest.advanceTimersByTime(2500);

    await waitFor(() => {
      expect(queryByText('Mock SplashScreen')).toBeNull();
      expect(getByText('Mock HomeScreen')).toBeTruthy();
    });
  });
});
