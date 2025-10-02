import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onFilterPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterPress }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => onSearch(query)}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.iconWrapper} onPress={onFilterPress}>
        <Icon name="filter-outline" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconWrapper: {
    paddingLeft: 8,
  },
});

export default SearchBar;
