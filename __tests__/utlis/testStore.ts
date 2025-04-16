import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../../src/features/weather/weatherSlice';
import type { WeatherState } from '../../src/types/weatherSlice';

export const createTestStore = (preloadedState: { weather: WeatherState }) => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
    preloadedState,
  });
};
