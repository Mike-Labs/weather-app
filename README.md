# weather-app
An App using openweatherMap Api to show weather forecast for any town

# Weather Api

Go to [Open Weather Map](https://home.openweathermap.org/api_keys) create a free api key to use for the app.

## Adding Functionality to Weather App

After creating an API key

Add API Key in homeScreen.tsx and also in DetailScreen.tsx

The openweathermap endpoint fetches weather conditions in HomeScreen.tsx for 5 default cities.

There's a SearchBar.tsx that allows user to search their custom town gloablly.

The searched cities are rendered in HomeScreen.tsx whereby each city is clickable.

Upon clicking any town or city the user is navigated to DetailScreen.tsx where the next 5 day weather forecast is rendered.

## Prerequisites
- [Node.js](https://nodejs.org/) (v22.19.0 or higher)
- [React Native CLI](https://reactnative.dev/docs/getting-started-without-a-framework) (v0.81.4 or higher)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Mike-Labs/weather-app.git
cd your-repo
```
### 2. Install Dependancies
```
npm install
```
### 3. Start the Project
```
npx react-native start
````
### 4. Run the Android Emulator
```
npx react-native run-android
````    
