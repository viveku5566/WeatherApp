import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { WeatherContext } from '../src/contexts/WeatherContext';
import { WeatherContextType } from '../src/contexts/WeatherContext.types';

const mockWeatherData = {
  city: 'London',
  current: {
    dt: 1713124800,
    sunrise: 1713106800,
    sunset: 1713153600,
    temp: 22.5,
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  },
  hourly: new Array(12).fill({
    dt: 1713128400,
    temp: 21.5,
    weather: [{ icon: '01d' }],
  }),
  daily: new Array(7).fill({
    dt: 1713207600,
    temp: { min: 15, max: 23 },
    weather: [{ icon: '01d' }],
  }),
};

const renderWithContext = (contextOverrides: Partial<WeatherContextType> = {}) => {
  const defaultContext: WeatherContextType = {
    data: null,
    loading: false,
    error: '',
    fetchCityWeather: jest.fn(),
    fetchCurrentLocationWeather: jest.fn(),
  };

  const contextValue = { ...defaultContext, ...contextOverrides };

  return render(
    <WeatherContext.Provider value={contextValue}>
      <HomeScreen />
    </WeatherContext.Provider>
  );
};

describe('HomeScreen Component', () => {
  it('displays city, temp, and description when data is available', () => {
    const { getByText } = renderWithContext({ data: mockWeatherData });

    expect(getByText('London')).toBeTruthy();
    expect(getByText('23°')).toBeTruthy(); 
    expect(getByText('clear sky')).toBeTruthy();
  });

  it('shows loading spinner when loading is true', () => {
    const { getByTestId } = renderWithContext({ loading: true });
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('displays error when error is present', () => {
    const { getByText } = renderWithContext({ error: 'City not found' });
    expect(getByText('City not found')).toBeTruthy();
  });

  it('renders nothing when there is no data and no error', () => {
    const { queryByText } = renderWithContext();
    expect(queryByText('London')).toBeNull();
  });
});
