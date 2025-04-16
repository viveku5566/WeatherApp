import React from 'react';
import {
  Card,
  CityText,
  ConditionText,
  TemperatureText,
  WeatherIcon
} from '../styles/WeatherCard.styles';

type Props = {
  city: string;
  temp: number;
  condition: string;
  icon: string;
};

const WeatherCard = ({ city, temp, condition, icon }: Props) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <Card>
      <CityText>{city}</CityText>
      <WeatherIcon source={{ uri: iconUrl }} />
      <TemperatureText>{temp}°C</TemperatureText>
      <ConditionText>{condition}</ConditionText>
    </Card>
  );
};

export default WeatherCard;
