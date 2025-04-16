import React from 'react';
import { render } from '@testing-library/react-native';
import HourlyForecast from '../src/components/HourlyForecast';
import moment from 'moment';
import type { HourlyWeather } from '../src/types/weather';

const mockHourly: HourlyWeather[] = [
  {
    dt: 1713016800,
    temp: 27,
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  },
  {
    dt: 1713027600,
    temp: 29,
    weather: [{ main: 'Clouds', description: 'few clouds', icon: '02d' }],
  },
];

describe('HourlyForecast Component', () => {
  it('renders each hourly forecast with time, temp, and icon', () => {
    const { getByText, getAllByTestId } = render(<HourlyForecast hourly={mockHourly} />);

    mockHourly.forEach(hour => {
      const hourLabel = moment(hour.dt * 1000).format('ha');
      expect(getByText(hourLabel)).toBeTruthy();
      expect(getByText(`${Math.round(hour.temp)}°`)).toBeTruthy();
    });

    const icons = getAllByTestId('hourly-icon');
    expect(icons.length).toBe(mockHourly.length);
  });
});
