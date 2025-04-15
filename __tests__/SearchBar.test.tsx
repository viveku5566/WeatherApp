import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../src/components/SearchBar';
import { WeatherContext } from '../src/contexts/WeatherContext';
import { WeatherContextType } from '../src/contexts/WeatherContext.types';

describe('SearchBar Component', () => {
  const mockFetchCityWeather = jest.fn();

  const mockContext: WeatherContextType = {
    data: null,
    loading: false,
    error: '',
    fetchCityWeather: mockFetchCityWeather,
    fetchCurrentLocationWeather: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    const { getByPlaceholderText, getByText } = render(
      <WeatherContext.Provider value={mockContext}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('calls fetchCityWeather when a valid city is entered', () => {
    const { getByPlaceholderText, getByText } = render(
      <WeatherContext.Provider value={mockContext}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    const input = getByPlaceholderText('Enter city');
    const button = getByText('Search');

    fireEvent.changeText(input, 'Delhi');
    fireEvent.press(button);

    expect(mockFetchCityWeather).toHaveBeenCalledWith('Delhi');
  });

  it('does not call fetchCityWeather when input is empty', () => {
    const { getByText } = render(
      <WeatherContext.Provider value={mockContext}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    fireEvent.press(getByText('Search'));
    expect(mockFetchCityWeather).not.toHaveBeenCalled();
  });

  it('clears input after pressing search', () => {
    const { getByPlaceholderText, getByText } = render(
      <WeatherContext.Provider value={mockContext}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'Mumbai');
    fireEvent.press(getByText('Search'));

    expect(input.props.value).toBe('');
  });
});
