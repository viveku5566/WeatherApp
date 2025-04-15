import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import * as Animatable from 'react-native-animatable';

type Props = {
  data: {
    name: string;
    main: { temp: number };
    weather: { main: string; icon: string }[];
  } | null;
};

const WeatherCard = ({ data }: Props) => {
  if (!data) return null;

  const { name, main, weather } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <Animatable.View animation="fadeInUp" duration={1000}>
      <BlurView style={styles.card} blurType="light" blurAmount={15} reducedTransparencyFallbackColor="white">
        <Text style={styles.city}>{name}</Text>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <Text style={styles.temp}>{main.temp}°C</Text>
        <Text style={styles.condition}>{weather[0].main}</Text>
      </BlurView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 20,
    marginTop: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  city: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 26,
    fontWeight: '500',
    color: '#fff',
  },
  condition: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#e0f7fa',
  },
});

export default WeatherCard;
