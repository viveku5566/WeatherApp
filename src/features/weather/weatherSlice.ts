import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCityAPI, fetchWeatherByCoordsAPI } from '../../services/weatherService';
import { ForecastData } from '../../types/weather';
import { checkInternetConnection } from '../../utils/network';

interface WeatherState {
  data: ForecastData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string, { rejectWithValue }) => {
    const isOnline = await checkInternetConnection();
    if (!isOnline) {
      return rejectWithValue('No internet connection');
    }

    try {
      return await fetchWeatherByCityAPI(city);
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch city weather');
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    const isOnline = await checkInternetConnection();
    if (!isOnline) {
      return rejectWithValue('No internet connection');
    }

    try {
      return await fetchWeatherByCoordsAPI(lat, lon);
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch weather by coordinates');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherByCity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchWeatherByCoords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
