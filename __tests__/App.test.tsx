import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

jest.useFakeTimers();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => <>{children}</>,
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ children }: any) => <>{children}</>,
  }),
}));

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }: any) => <>{children}</>,
}));

jest.mock('../src/screens/SplashScreen', () => () => <Text>Mock SplashScreen</Text>);
jest.mock('../src/screens/HomeScreen', () => () => <Text>Mock HomeScreen</Text>);

describe('App.tsx', () => {
  it('renders SplashScreen first and then navigates to HomeScreen', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Mock SplashScreen')).toBeTruthy();

    jest.advanceTimersByTime(2500);

    await waitFor(() => {
      expect(queryByText('Mock SplashScreen')).toBeNull();
      expect(getByText('Mock HomeScreen')).toBeTruthy();
    });
  });
});
