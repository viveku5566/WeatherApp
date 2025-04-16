
export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  dt: number;
  temp: number;
  sunrise: number;
  sunset: number;
  weather: WeatherCondition[];
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
}

export interface DailyTemp {
  min: number;
  max: number;
}

export interface DailyWeather {
  dt: number;
  temp: DailyTemp;
  weather: WeatherCondition[];
}

export interface ForecastData {
  city: string;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}
