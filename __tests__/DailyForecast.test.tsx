import React from 'react';
import { render } from '@testing-library/react-native';
import DailyForecast from '../src/components/DailyForecast';
import moment from 'moment';

const mockDaily = [
  {
    dt: 1712995200, 
    temp: { min: 22, max: 30 },
    weather: [{ icon: '01d' }],
  },
  {
    dt: 1713081600,
    temp: { min: 23, max: 32 },
    weather: [{ icon: '03d' }],
  },
];

describe('DailyForecast Component', () => {
  it('renders all forecast rows correctly', () => {
    const { getByText, getAllByTestId } = render(<DailyForecast daily={mockDaily} />);

    expect(getByText(moment(mockDaily[0].dt * 1000).format('ddd'))).toBeTruthy();
    expect(getByText('22° / 30°')).toBeTruthy();
    expect(getByText('23° / 32°')).toBeTruthy();
    expect(getAllByTestId('daily-icon').length).toBe(mockDaily.length);
  });
});
