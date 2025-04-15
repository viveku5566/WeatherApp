import axios from 'axios';

const API_KEY = 'dd2df73025961107bff90a1582ab78b1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';


export const fetchCityWeather = async (city: string) => {
  try {
    const geoRes = await axios.get(GEO_URL, {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY,
      },
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
      city: name || city,
      ...weatherRes.data,
    };
  } catch (error: any) {
    console.error('fetchCityWeather error:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to fetch city weather');
  }
};


export const fetchWeatherDataByCoords = async (lat: number, lon: number) => {
  try {
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
  } catch (error: any) {
    console.error('fetchWeatherDataByCoords error:', error?.response?.data || error.message);
    throw new Error('Failed to fetch weather by location');
  }
};
