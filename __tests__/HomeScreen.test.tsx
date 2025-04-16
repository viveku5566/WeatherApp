import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HomeScreen from '../src/screens/HomeScreen';
import type { ForecastData } from '../src/types/weather';

const mockStore = configureMockStore([thunk]);

const mockForecastData: ForecastData = {
  city: 'London',
  current: {
    dt: 1713124800,
    sunrise: 1713106800,
    sunset: 1713153600,
    temp: 22.5,
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  },
  hourly: Array.from({ length: 12 }).map((_, index) => ({
    dt: 1713128400 + index * 3600,
    temp: 21.5 + index,
    weather: [{ main: 'Clear', description: 'clear', icon: '01d' }],
  })),
  daily: Array.from({ length: 7 }).map((_, index) => ({
    dt: 1713207600 + index * 86400,
    temp: { min: 15 + index, max: 23 + index },
    weather: [{ main: 'Clear', description: 'clear', icon: '01d' }],
  })),
};

const renderWithRedux = (weatherState: Partial<ReturnType<typeof mockStore>['getState']>['weather']) => {
  const store = mockStore({
    weather: {
      data: null,
      loading: false,
      error: null,
      ...weatherState,
    },
  });

  return render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

describe('HomeScreen (Redux)', () => {
  it('renders city name, temperature, and weather description when data is available', () => {
    const { getByText } = renderWithRedux({
      data: mockForecastData,
    });

    expect(getByText('London')).toBeTruthy();
    expect(getByText(`${Math.round(mockForecastData.current.temp)}°`)).toBeTruthy();
    expect(getByText('clear sky')).toBeTruthy();
  });

  it('shows loading spinner when loading is true', () => {
    const { getByTestId } = renderWithRedux({
      loading: true,
    });

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('displays offline banner when error is "No internet connection"', () => {
    const { getByText } = renderWithRedux({
      error: 'No internet connection',
    });

    expect(getByText('You are offline. Please check your connection.')).toBeTruthy();
  });

  it('displays error text when other error exists', () => {
    const { getByText } = renderWithRedux({
      error: 'City not found',
    });

    expect(getByText('City not found')).toBeTruthy();
  });

  it('renders nothing when no data, not loading, and no error', () => {
    const { queryByText } = renderWithRedux({});

    expect(queryByText('London')).toBeNull();
    expect(queryByText('clear sky')).toBeNull();
  });
});
