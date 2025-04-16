import React from 'react';
import moment from 'moment';
import { DailyWeather } from '../types/weather';
import {
  Row,
  DayText,
  TempText,
  WeatherIcon
} from '../styles/DailyForecast.styles';

type Props = {
  daily: DailyWeather[];
};

const DailyForecast = ({ daily }: Props) => {
  return (
    <>
      {daily.map((item, index) => {
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        return (
          <Row key={index}>
            <DayText>{moment(item.dt * 1000).format('ddd')}</DayText>
            <WeatherIcon source={{ uri: iconUrl }} />
            <TempText>
              {Math.round(item.temp.min)}° / {Math.round(item.temp.max)}°
            </TempText>
          </Row>
        );
      })}
    </>
  );
};

export default DailyForecast;
