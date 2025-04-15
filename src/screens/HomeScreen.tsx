import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { WeatherContext } from '../contexts/WeatherContext';
import SearchBar from '../components/SearchBar';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';

const getBackgroundImageUrl = (condition: string, isDay: boolean): string => {
  if (!isDay) {
    return 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80'; 
  }

  switch (condition.toLowerCase()) {
    case 'clear':
      return 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80'; 
    case 'clouds':
      return 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80'; 
    case 'rain':
    case 'drizzle':
      return 'https://images.unsplash.com/photo-1526676031250-381f6e0d7baf?auto=format&fit=crop&w=1600&q=80'; 
    case 'snow':
      return 'https://images.unsplash.com/photo-1608889175119-35e1a3a1cf6f?auto=format&fit=crop&w=1600&q=80'; 
    case 'thunderstorm':
      return 'https://images.unsplash.com/photo-1561489429-7d94a22d7f8e?auto=format&fit=crop&w=1600&q=80'; 
    default:
      return 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80'; 
  }
};

const HomeScreen = () => {
  const { data, loading, error } = useContext(WeatherContext);

  const isDay = data
    ? data.current.dt > data.current.sunrise && data.current.dt < data.current.sunset
    : true;

    const backgroundUrl = data
    ? getBackgroundImageUrl(data.current.weather[0].main, isDay)
    : getBackgroundImageUrl('default', true);
  
  return (
    <ImageBackground
      source={{ uri: backgroundUrl }}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <SearchBar />
        {loading && <ActivityIndicator testID="ActivityIndicator" size="large" color="#fff" />}
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : data ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.city}>{data.city}</Text>
              <Text style={styles.temp}>{Math.round(data.current.temp)}°</Text>
              <Text style={styles.desc}>
                {data.current.weather[0].description}
              </Text>
            </View>

            <HourlyForecast hourly={data.hourly.slice(0, 12)} />
            <DailyForecast daily={data.daily.slice(0, 7)} />
          </ScrollView>
        ) : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  city: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },
  temp: {
    fontSize: 64,
    fontWeight: '300',
    color: '#fff',
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#eee',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 12,
  },
});

export default HomeScreen;
