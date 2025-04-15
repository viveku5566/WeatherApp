import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

type Props = {
  daily: any[];
};

const DailyForecast = ({ daily }: Props) => {
  return (
    <View>
      {daily.map((item, index) => {
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.day}>{moment(item.dt * 1000).format('ddd')}</Text>
            <Image
  testID="daily-icon"
  source={{ uri: iconUrl }}
  style={styles.icon}
/>

            <Text style={styles.temp}>{Math.round(item.temp.min)}° / {Math.round(item.temp.max)}°</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  day: {
    fontSize: 16,
    color: '#fff',
    width: 60,
  },
  icon: {
    width: 40,
    height: 40,
  },
  temp: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DailyForecast;
