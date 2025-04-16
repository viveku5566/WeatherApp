import axios from 'axios';
import { API_KEY, GEO_URL, BASE_URL } from '../constants/api';
import { ForecastData } from '../types/weather';

export const fetchWeatherByCityAPI = async (city: string): Promise<ForecastData> => {
  const geoRes = await axios.get(GEO_URL, {
    params: { q: city, limit: 1, appid: API_KEY },
  });

  if (!geoRes.data || geoRes.data.length === 0) {
    throw new Error('City not found');
  }

  const { lat, lon, name } = geoRes.data[0];

  const weatherRes = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      exclude: 'minutely,alerts',
      units: 'metric',
      appid: API_KEY,
    },
  });

  return {
    city: name,
    ...weatherRes.data,
  };
};

export const fetchWeatherByCoordsAPI = async (lat: number, lon: number): Promise<ForecastData> => {
  const weatherRes = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      exclude: 'minutely,alerts',
      units: 'metric',
      appid: API_KEY,
    },
  });

  return weatherRes.data;
};
