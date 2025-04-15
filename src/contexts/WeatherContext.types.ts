export type ForecastData = {
  city: string;
  current: {
    dt: number;
    temp: number;
    sunrise: number;
    sunset: number;
    weather: { main: string; description: string; icon: string }[];
  };
  hourly: any[];
  daily: any[];
};

export type WeatherContextType = {
  data: ForecastData | null;
  loading: boolean;
  error: string;
  fetchCityWeather: (city: string) => void;
  fetchCurrentLocationWeather: () => void;
};

