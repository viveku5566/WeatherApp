import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {
  fetchCityWeather as fetchCityWeatherFromAPI,
  fetchWeatherDataByCoords,
} from '../services/weatherService';
import { WeatherContextType, ForecastData } from './WeatherContext.types';

export const WeatherContext = createContext<WeatherContextType>({
  data: null,
  loading: false,
  error: '',
  fetchCityWeather: () => {},
  fetchCurrentLocationWeather: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ForecastData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCityWeather = async (city: string) => {
    setLoading(true);
    try {
      const result = await fetchCityWeatherFromAPI(city);
      setData(result);
      await AsyncStorage.setItem('lastCity', city);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error fetching city');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocationWeather = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const result = await fetchWeatherDataByCoords(latitude, longitude);
          setData({ ...result, city: 'Current Location' });
          setError('');
        } catch (err: any) {
          setError('Error fetching location');
        } finally {
          setLoading(false);
        }
      },
      error => {
        setError('Permission denied or failed to get location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        data,
        loading,
        error,
        fetchCityWeather,
        fetchCurrentLocationWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
