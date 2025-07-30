import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { THEMES } from "../utils/themes";
import { getTheme } from "../utils/storage";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { setTheme, color } = useContext(ThemeContext);
  const [selected, setSelected] = useState("Beginner");

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await getTheme();
      setSelected(saved);
    };
    loadTheme();
  }, []);

  const handleSelect = async (themeName) => {
    await setTheme(themeName);       // updates context + storage
    setSelected(themeName);          // update local UI state
  };

  const renderItem = ({ item }) => {
    const isActive = item.name === selected;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item.name)}
        style={[styles.themeItem, isActive && styles.selected]}
      >
        <View style={[styles.colorPreview, { backgroundColor: item.color }]} />
        <Text style={[styles.themeText, isActive && { color: item.color }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.header, { color }]}>Choose Theme</Text>

        <FlatList
          data={Object.values(THEMES)}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 20,
  },
  back: {
    fontFamily: "Courier",
    marginBottom: 12,
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontFamily: "Courier",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  themeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 16,
  },
  themeText: {
    fontSize: 16,
    fontFamily: "Courier",
    color: "#ccc",
  },
  selected: {
    backgroundColor: "#111",
    padding: 6,
    borderRadius: 6,
  },
});
