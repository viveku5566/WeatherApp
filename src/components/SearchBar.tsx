import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { WeatherContext } from '../contexts/WeatherContext';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const { fetchCityWeather } = useContext(WeatherContext);

  const onSearch = () => {
    if (input.trim() !== '') {
      fetchCityWeather(input.trim());
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Search" onPress={onSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
});

export default SearchBar;
