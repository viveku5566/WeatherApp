import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchWeatherByCity } from '../features/weather/weatherSlice';
import { debounce } from '../utils/debounce';
import { Container,InputField, SearchButton } from '../styles/SearchBar.styles';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = debounce((value: string) => {
    if (value.trim()) {
      dispatch(fetchWeatherByCity(value.trim()));
      setCity('');
    }
  }, 800);

  return (
    <Container>
      <InputField
        placeholder="Enter city"
        value={city}
        onChangeText={(text : string) => {
          setCity(text);
          handleSearch(text);
        }}
      />
      <SearchButton title="Search" onPress={() => handleSearch(city)} />
    </Container>
  );
};

export default SearchBar;
