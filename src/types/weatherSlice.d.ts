import type { ForecastData } from './weather';

export interface WeatherState {
  data: ForecastData | null;
  loading: boolean;
  error: string;
}
