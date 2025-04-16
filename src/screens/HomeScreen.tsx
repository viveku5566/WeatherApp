import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useAppSelector } from '../hooks/useAppSelector';
import SearchBar from '../components/SearchBar';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import WeatherCard from '../components/WeatherCard';
import {
  BackgroundImage,
  Overlay,
  Wrapper,
  ErrorText,
  ScrollArea,
  OfflineBanner,
} from '../styles/HomeScreen.styles';

const getBackgroundImageUrl = (condition: string, isDay: boolean): string => {
  if (!isDay) {
    return 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80';
  }

  const imageMap: Record<string, string> = {
    clear: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
    clouds: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80',
    rain: 'https://images.unsplash.com/photo-1526676031250-381f6e0d7baf?auto=format&fit=crop&w=1600&q=80',
    drizzle: 'https://images.unsplash.com/photo-1526676031250-381f6e0d7baf?auto=format&fit=crop&w=1600&q=80',
    snow: 'https://images.unsplash.com/photo-1608889175119-35e1a3a1cf6f?auto=format&fit=crop&w=1600&q=80',
    thunderstorm: 'https://images.unsplash.com/photo-1561489429-7d94a22d7f8e?auto=format&fit=crop&w=1600&q=80',
    default: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
  };

  return imageMap[condition.toLowerCase()] ?? imageMap.default;
};

const HomeScreen = () => {
  const { data, loading, error } = useAppSelector(state => state.weather);

  const isDay =
    !!data &&
    data.current.dt > data.current.sunrise &&
    data.current.dt < data.current.sunset;

  const backgroundUrl = data
    ? getBackgroundImageUrl(data.current.weather[0].main, isDay)
    : getBackgroundImageUrl('default', true);

  const isOffline = error === 'No internet connection';

  return (
    <BackgroundImage source={{ uri: backgroundUrl }} resizeMode="cover">
      <Overlay>
        <Wrapper>
          <SearchBar />

          {loading && <ActivityIndicator testID="ActivityIndicator" size="large" color="#ffffff" />}

          {isOffline && <OfflineBanner>You are offline. Please check your connection.</OfflineBanner>}

          {!loading && error && !isOffline && <ErrorText>{error}</ErrorText>}

          {!loading && !error && data && (
            <ScrollArea>
              <WeatherCard
                city={data.city}
                temp={Math.round(data.current.temp)}
                condition={data.current.weather[0].description}
                icon={data.current.weather[0].icon}
              />
              <HourlyForecast hourly={data.hourly.slice(0, 12)} />
              <DailyForecast daily={data.daily.slice(0, 7)} />
            </ScrollArea>
          )}
        </Wrapper>
      </Overlay>
    </BackgroundImage>
  );
};

export default HomeScreen;
