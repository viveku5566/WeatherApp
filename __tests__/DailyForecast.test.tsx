import React from 'react';
import { render } from '@testing-library/react-native';
import DailyForecast from '../src/components/DailyForecast';
import moment from 'moment';
import type { DailyWeather } from '../src/types/weather';

const mockForecastData: DailyWeather[] = [
  {
    dt: 1712995200,
    temp: { min: 22, max: 30 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  },
  {
    dt: 1713081600,
    temp: { min: 23, max: 32 },
    weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
  },
];

describe('DailyForecast Component', () => {
  it('renders correct number of daily forecast rows and temperatures', () => {
    const { getByText, getAllByTestId } = render(
      <DailyForecast daily={mockForecastData} />
    );

    mockForecastData.forEach(({ dt, temp }) => {
      const dayLabel = moment(dt * 1000).format('ddd');
      const tempLabel = `${Math.round(temp.min)}° / ${Math.round(temp.max)}°`;

      expect(getByText(dayLabel)).toBeTruthy();
      expect(getByText(tempLabel)).toBeTruthy();
    });

    expect(getAllByTestId('daily-icon')).toHaveLength(mockForecastData.length);
  });
});
