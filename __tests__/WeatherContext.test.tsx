import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { WeatherProvider,WeatherContext } from '../src/contexts/WeatherContext';
import * as weatherService from '../src/services/weatherService';
import Geolocation from 'react-native-geolocation-service';

jest.mock('../services/weatherService');
jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

const mockCityWeather = {
  city: 'Mumbai',
  current: {
    dt: 123456,
    temp: 30,
    sunrise: 111,
    sunset: 222,
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  },
  hourly: [],
  daily: [],
};

describe('WeatherContext', () => {
  it('fetches weather for a city and updates context', async () => {
    (weatherService.fetchCityWeather as jest.Mock).mockResolvedValueOnce(mockCityWeather);

    const TestComponent = () => {
      const { data, fetchCityWeather } = React.useContext(WeatherContext);

      React.useEffect(() => {
        fetchCityWeather('Mumbai');
      }, []);

      return <>{data && <>{data.city}</>}</>;
    };

    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => expect(getByText('Mumbai')).toBeTruthy());
  });

  it('handles geolocation and fetches weather by coordinates', async () => {
    (Geolocation.getCurrentPosition as jest.Mock).mockImplementation((success: any) => {
      success({ coords: { latitude: 19.076, longitude: 72.8777 } });
    });

    (weatherService.fetchWeatherDataByCoords as jest.Mock).mockResolvedValueOnce(mockCityWeather);

    const TestComponent = () => {
      const { data, fetchCurrentLocationWeather } = React.useContext(WeatherContext);

      React.useEffect(() => {
        fetchCurrentLocationWeather();
      }, []);

      return <>{data && <>{data.city}</>}</>;
    };

    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => expect(getByText('Mumbai')).toBeTruthy());
  });

  it('sets error on city fetch failure', async () => {
    (weatherService.fetchCityWeather as jest.Mock).mockRejectedValueOnce(new Error('City not found'));

    const TestComponent = () => {
      const { error, fetchCityWeather } = React.useContext(WeatherContext);

      React.useEffect(() => {
        fetchCityWeather('InvalidCity');
      }, []);

      return <>{error && <>{error}</>}</>;
    };

    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => expect(getByText('City not found')).toBeTruthy());
  });
});
