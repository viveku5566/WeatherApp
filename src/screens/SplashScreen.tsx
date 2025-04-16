import React from 'react';
import {
  SplashContainer,
  SplashLogo,
  SplashTitle
} from '../styles/SplashScreen.styles';

const SplashScreen = () => {
  return (
    <SplashContainer>
      <SplashLogo
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1116/1116453.png',
        }}
        testID="splash-logo"
      />
      <SplashTitle>WeatherMate</SplashTitle>
    </SplashContainer>
  );
};

export default SplashScreen;
