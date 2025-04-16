import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SearchBar from '../src/components/SearchBar';
import { fetchWeatherByCity } from '../src/features/weather/weatherSlice';

jest.mock('../src/features/weather/weatherSlice', () => ({
  ...jest.requireActual('../src/features/weather/weatherSlice'),
  fetchWeatherByCity: jest.fn((city: string) => ({ type: 'weather/fetchWeatherByCity', payload: city })),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const renderWithStore = (store: any) => (
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  )
);

describe('🔍 SearchBar Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      weather: {
        data: null,
        loading: false,
        error: '',
      },
    });

    store.dispatch = jest.fn();
    jest.clearAllMocks();
  });

  it('renders input and button correctly', () => {
    const { getByPlaceholderText, getByText } = renderWithStore(store);
    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('dispatches fetchWeatherByCity on valid input', () => {
    const { getByPlaceholderText, getByText } = renderWithStore(store);

    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'Delhi');
    fireEvent.press(getByText('Search'));

    expect(fetchWeatherByCity).toHaveBeenCalledWith('Delhi');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('does not dispatch action for empty input', () => {
    const { getByText } = renderWithStore(store);

    fireEvent.press(getByText('Search'));

    expect(fetchWeatherByCity).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('clears input after dispatch', () => {
    const { getByPlaceholderText, getByText } = renderWithStore(store);

    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'Mumbai');
    fireEvent.press(getByText('Search'));

    expect(input.props.value).toBe('');
  });
});
