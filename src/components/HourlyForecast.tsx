import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';

type Props = {
  hourly: any[];
};

const HourlyForecast = ({ hourly }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={hourly}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <View style={styles.item}>
              <Text style={styles.hour}>{moment(item.dt * 1000).format('ha')}</Text>
              <Image
  testID="hourly-icon"
  source={{ uri: iconUrl }}
  style={styles.icon}
/>
              <Text style={styles.temp}>{Math.round(item.temp)}°</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  item: {
    alignItems: 'center',
    marginRight: 20,
  },
  hour: {
    color: '#fff',
    fontSize: 14,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
});

export default HourlyForecast;
