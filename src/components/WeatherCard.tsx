import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  windSpeed: number;
  humidity: number;
  lat: number;
  lon: number;
  onPress: (city: string, lat: number, lon: number) => void;
}

const getWeatherIcon = (description: string) => {
  const lower = description.toLowerCase();
  if (lower.includes("cloud")) return "cloud-outline";
  if (lower.includes("rain")) return "rainy-outline";
  if (lower.includes("clear")) return "sunny-outline";
  if (lower.includes("snow")) return "snow-outline";
  if (lower.includes("storm")) return "thunderstorm-outline";
  return "partly-sunny-outline";
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
  windSpeed,
  humidity,
  lat,
  lon,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(city, lat, lon)} // ✅ Pass city, lat, lon
    activeOpacity={0.8}
  >
    <View style={styles.top}>
      <Text style={styles.city}>{city}</Text>
    </View>

    <View style={styles.middle}>
      <Text style={styles.temp}>{Math.round(temperature)}°C</Text>
      <View style={styles.condition}>
        <Icon name={getWeatherIcon(description)} size={40} color="#333" />
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>

    <View style={styles.bottom}>
      <View style={styles.infoRow}>
        <Icon name="navigate-outline" size={18} color="#555" />
        <Text style={styles.info}>{windSpeed} m/s</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="water-outline" size={18} color="#555" />
        <Text style={styles.info}>{humidity}%</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  top: { marginBottom: 8 },
  city: { fontSize: 20, fontWeight: "bold", color: "#222" },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  temp: { fontSize: 28, fontWeight: "600", color: "#333" },
  condition: { alignItems: "center" },
  desc: {
    marginTop: 4,
    fontSize: 14,
    color: "#444",
    textTransform: "capitalize",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  infoRow: { flexDirection: "row", alignItems: "center" },
  info: { marginLeft: 6, fontSize: 14, color: "#333" },
});

export default WeatherCard;
