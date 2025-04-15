Features
Real-time Weather Forecast

Current temperature, hourly & 7-day forecast (Free plan wont work but implemented it)

City-based Search

Search by city name with autocomplete potential

Current Location Detection

Uses device geolocation to fetch weather

Dynamic Backgrounds

Day/night and weather condition-based backgrounds (via image URLs)

Dark Mode Toggle

Splash Screen + Intro Animation

Responsive & Modern UI

Built for iOS (Android support possible)

Tech Stack

Framework : React Native (CLI)
Language : TypeScript
API : OpenWeatherMap OneCall API (v2.5)
HTTP Client : Axios
Geolocation : react-native-geolocation-service
Navigation : React Navigation (@react-navigation/native)
State Management : Context API
Styling : StyleSheet (inline styles)

Installation & Setup

1. Prerequisites
   Node.js ≥ 16

React Native CLI (npm install -g react-native-cli)

Xcode (for iOS)

Cocoapods (sudo gem install cocoapods)

2. iOS Setup
   bash

cd ios
pod install
cd ..

State Management
Context API via WeatherContext.tsx

Stores:

Current weather data

Loading state

Error message

Weather fetch methods

Animations & UI Enhancements
Splash fade-in (can be extended with Lottie)

Weather-based background via ImageBackground using Unsplash image URLs

Responsive layout with ScrollView, SafeAreaView, and dynamic text

Future Improvements:

Add Android support and permissions

Offline caching with AsyncStorage

Unit toggle (°C/°F)

Add weather icons & sunrise/sunset visuals

License

MIT License
