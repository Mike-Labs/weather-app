import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

interface ForecastItem {
  date: string;         // "YYYY-MM-DD"
  temp: number;
  description: string;
  icon: string;
}

const API_KEY = ""; // <- replace with your key

const DetailScreen = ({ route }: any) => {
  const { city, lat, lon } = route.params;
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        // Group entries by date (YYYY-MM-DD)
        const grouped: { [date: string]: any[] } = forecastRes.data.list.reduce(
          (acc: any, entry: any) => {
            const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(entry);
            return acc;
          },
          {}
        );

        // Build daily array: pick the midday entry for each day
        const dailyForecasts: ForecastItem[] = Object.keys(grouped).map((date) => {
          const dayEntries = grouped[date];
          const middayEntry = dayEntries[Math.floor(dayEntries.length / 2)];
          return {
            date,
            temp: middayEntry.main.temp,
            description: middayEntry.weather[0].description,
            icon: middayEntry.weather[0].icon,
          };
        });

        setForecast(dailyForecasts.slice(0, 5)); // only the first 5 days
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    return new Date(dateString).toLocaleDateString("en-US", options); // e.g. "Wed, 01 Oct"
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      // NOTE: path depends on where your assets folder is. This assumes src/screens -> ../../assets/...
      source={require("../../assets/background_cloud.jpg")}
      style={styles.background} // <- this must exist in styles (fixed)
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>5-Day Forecast for {city}</Text>

        <FlatList
          data={forecast}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Top: Day */}
              <Text style={styles.date}>{formatDate(item.date)}</Text>

              {/* Middle: Icon (left) + Temp (right) */}
              <View style={styles.middleRow}>
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
                  style={styles.icon}
                />
                <Text style={styles.temp}>{item.temp.toFixed(1)}°C</Text>
              </View>

              {/* Bottom: Description */}
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 16,
    // semi-transparent overlay to keep text readable on top of background image
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.9)", // card stands out over overlay
    borderRadius: 10,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#222",
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between", // left = icon, right = temp
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  desc: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#444",
    marginTop: 6,
    textTransform: "capitalize",
  },
});

export default DetailScreen;
