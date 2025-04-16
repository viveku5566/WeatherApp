import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 8px;
  padding: 0 16px;
`;

export const DayText = styled.Text`
  font-size: 16px;
  color: #fff;
  width: 60px;
`;

export const TempText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const WeatherIcon = styled.Image`
  width: 40px;
  height: 40px;
`;
