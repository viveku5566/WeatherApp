import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  margin: 20px;
  align-items: center;
`;

export const CityText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
`;

export const TemperatureText = styled.Text`
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
`;

export const ConditionText = styled.Text`
  font-size: 18px;
  color: #e0f7fa;
  font-style: italic;
  margin-top: 8px;
`;

export const WeatherIcon = styled.Image`
  width: 100px;
  height: 100px;
`;
