import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const API_KEY = ""; // replace with your OpenWeatherMap key
const defaultCities = ["Nairobi", "London", "New York", "Tokyo", "Paris"];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch default cities on load
  useEffect(() => {
    const fetchDefaultCities = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          defaultCities.map(async (city) => {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
              );
              const { name, main, weather, wind, coord } = response.data;
              return {
                city: name,
                temperature: main.temp,
                description: weather[0].description,
                windSpeed: wind.speed,
                humidity: main.humidity,
                lat: coord.lat,
                lon: coord.lon,
              };
            } catch {
              return null;
            }
          })
        );
        setWeatherData(results.filter((item) => item !== null));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultCities();
  }, []);

  // Handle search
  const handleSearch = async (city: string) => {
    if (!city) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const { name, main, weather, wind, coord } = response.data;

      const newWeather = {
        city: name,
        temperature: main.temp,
        description: weather[0].description,
        windSpeed: wind.speed,
        humidity: main.humidity,
        lat: coord.lat,
        lon: coord.lon,
      };

      setWeatherData((prev) => [newWeather, ...prev]);
    } catch (error) {
      Alert.alert("Error", "City not found!");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterPress = () => {
    Alert.alert("Filter button pressed!");
  };

  return (
    <ImageBackground
      source={require("../../assets/background_cloud.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SearchBar onSearch={handleSearch} onFilterPress={handleFilterPress} />

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        <ScrollView>
          {weatherData.length === 0 && !loading && (
            <Text style={styles.noData}>No weather data available</Text>
          )}

          {weatherData.map((w, index) => (
            <WeatherCard
              key={index}
              city={w.city}
              temperature={w.temperature}
              description={w.description}
              windSpeed={w.windSpeed}
              humidity={w.humidity}
              lat={w.lat}
              lon={w.lon}
              onPress={(city, lat, lon) =>
                navigation.navigate("Detail", { city, lat, lon })
              }
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, paddingTop: 40, paddingHorizontal: 16 },
  noData: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});

export default HomeScreen;
