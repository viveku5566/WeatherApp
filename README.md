# 🌤️ WeatherMate (WeatherApp) - React Native

WeatherMate is a beautifully designed and fully functional weather application built using **React Native** and **Redux Toolkit** with TypeScript. It provides current weather, hourly, and 7-day forecasts, along with city-based search and dynamic UI updates based on real-time data.

---

## 🚀 Features

- **🌡️ Real-time Weather Forecast**
  - Current temperature, hourly forecast, and 7-day forecast *(OneCall API v2.5 - free plan support limited)*

- **🏙️ City-based Search**
  - Search weather by city name *(autocomplete support possible in future)*

- **📍 Current Location Detection**
  - Uses device geolocation to fetch weather for your current location

- **🌅 Dynamic Backgrounds**
  - Day/night and condition-based background images (via Unsplash)

- **🌘 Dark Mode Ready**
  - Dark background overlay for readability

- **💫 Splash Screen & Intro Animation**
  - Built-in intro animation (can be replaced with Lottie)

- **📱 Responsive & Modern UI**
  - Clean, minimal layout using styled-components

---

## 🧱 Architecture

This app follows a scalable and modular architecture using **Redux Toolkit**:

/src
├── app/               # Redux store configuration
├── assets/            # App logos, splash images, etc.
├── components/        # Reusable UI components (SearchBar, ForecastCards, etc.)
├── features/weather/  # Redux slice and async thunks for weather
├── hooks/             # Typed Redux hooks (useAppDispatch, useAppSelector)
├── screens/           # Page-level views (HomeScreen, SplashScreen)
├── services/          # API logic using Axios
├── styles/            # Centralized styled-components definitions
├── types/             # TypeScript interfaces and global types
├── utils/             # Utility helpers (debounce.ts, network.ts)
├── __tests__/         # All Jest unit test files
│   ├── components/    # Component-specific tests (e.g., SearchBar.test.tsx)
│   ├── screens/       # Screen-level tests (e.g., HomeScreen.test.tsx)
│   ├── features/      # Slice/thunk unit tests
│   └── utils/         # Tests for debounce, network, etc.
|___



- **State Management**: Redux Toolkit
- **Side Effects / Async Logic**: `createAsyncThunk`
- **Type Safety**: End-to-end with TypeScript
- **Styling**: Clean and scalable via styled-components


## 🛠️ Tech Stack

| Tool / Library              | Purpose                            |
|----------------------------|------------------------------------|
| **React Native (CLI)**     | Framework                          |
| **TypeScript**             | Type safety                        |
| **Redux Toolkit**          | State management                   |
| **Axios**                  | HTTP client                        |
| **OpenWeatherMap API**     | Weather data                       |
| **React Navigation**       | Screen navigation                  |
| **react-native-geolocation-service** | Location access             |
| **styled-components**      | Component-based styling            |


State Management (Redux Toolkit)
State is stored under features/weather/weatherSlice.ts

Async fetches are handled with createAsyncThunk

Hook access via useAppSelector, useAppDispatch


Weather-based backgrounds (from Unsplash)

SplashScreen.tsx with fade-in animation

Responsive layout with SafeAreaView, ScrollView

Input debounce in search using custom debounce() utility

Offline Detection ✅

Gracefully handles no-internet scenarios

Displays banner: "You are offline. Please check your connection."

Testing:

Jest + React Native Testing Library

Coverage >90%

Unit tests for:

Redux logic (weather slice)

UI components (SearchBar, ForecastCards)

Screens (HomeScreen)


## ⚙️ Installation & Setup

### 1. Prerequisites

- Node.js ≥ 16  
- React Native CLI
  
  npm install -g react-native-cli

  Xcode (for iOS builds)

Cocoapods

sudo gem install cocoapods


2. iOS Setup

cd weatherApp
cd ios
pod install


Run the App

npx react-native run-ios


