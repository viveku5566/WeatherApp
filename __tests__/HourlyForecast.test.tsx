import React from 'react';
import { render } from '@testing-library/react-native';
import HourlyForecast from '../src/components/HourlyForecast';
import moment from 'moment';

const mockHourly = [
  {
    dt: 1713016800,
    temp: 27,
    weather: [{ icon: '01d' }],
  },
  {
    dt: 1713027600,
    temp: 29,
    weather: [{ icon: '02d' }],
  },
];

describe('HourlyForecast Component', () => {
  it('renders all hourly items with correct data', () => {
    const { getByText, getAllByTestId } = render(<HourlyForecast hourly={mockHourly} />);

    expect(getByText(moment(mockHourly[0].dt * 1000).format('ha'))).toBeTruthy();
    expect(getByText(moment(mockHourly[1].dt * 1000).format('ha'))).toBeTruthy();

    expect(getByText('27°')).toBeTruthy();
    expect(getByText('29°')).toBeTruthy();

    const icons = getAllByTestId('hourly-icon');
    expect(icons.length).toBe(mockHourly.length);
  });
});
