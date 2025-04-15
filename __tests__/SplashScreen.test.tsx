import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../src/screens/SplashScreen';

describe('SplashScreen', () => {
  it('renders logo and title correctly', () => {
    const { getByText, getByTestId } = render(<SplashScreen />);

    expect(getByText('WeatherMate')).toBeTruthy();

    expect(getByTestId('splash-logo')).toBeTruthy();
  });
});
