import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../src/screens/SplashScreen';

describe('SplashScreen Component', () => {
  it('renders the app title and splash image', () => {
    const { getByText, getByTestId } = render(<SplashScreen />);

    expect(getByText('WeatherMate')).toBeTruthy();

    const logo = getByTestId('splash-logo');
    expect(logo).toBeTruthy();
    expect(logo.props.source.uri).toContain('flaticon');
  });
});
