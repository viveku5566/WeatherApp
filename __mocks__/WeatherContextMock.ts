import { WeatherContextType } from "../src/contexts/WeatherContext.types";

export const mockWeatherContext: WeatherContextType = {
  data: null,
  loading: false,
  error: '',
  fetchCityWeather: jest.fn(),
  fetchCurrentLocationWeather: jest.fn(),
};
