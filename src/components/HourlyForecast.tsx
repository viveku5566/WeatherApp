import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import moment from 'moment';
import { HourlyWeather } from '../types/weather';
import {
  Container,
  ForecastItem,
  HourText,
  TempText,
  WeatherIcon
} from '../styles/HourlyForecast.styles';

type Props = {
  hourly: HourlyWeather[];
};

const HourlyForecast = ({ hourly }: Props) => {
  const renderItem = ({ item }: ListRenderItemInfo<HourlyWeather>) => {
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    return (
      <ForecastItem>
        <HourText>{moment(item.dt * 1000).format('ha')}</HourText>
        <WeatherIcon source={{ uri: iconUrl }} />
        <TempText>{Math.round(item.temp)}°</TempText>
      </ForecastItem>
    );
  };

  return (
    <Container>
      <FlatList
        data={hourly}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default HourlyForecast;
