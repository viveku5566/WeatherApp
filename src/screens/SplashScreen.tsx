import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
  testID="splash-logo"
  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1116/1116453.png' }}
  style={styles.logo}
/>
      <Text style={styles.title}>WeatherMate</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
