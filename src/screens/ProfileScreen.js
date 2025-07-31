import React, { useEffect, useState, useContext } from "react";
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getHackerStatus from "../utils/getHackerStatus";
import { THEMES } from "../utils/themes";
import { getTheme } from "../utils/storage";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { setTheme, color } = useContext(ThemeContext);
  const [selected, setSelected] = useState("Beginner");
  const [unlockedThemes, setUnlockedThemes] = useState(["Beginner"]);

const loadStatus = async () => {
  const count = await AsyncStorage.getItem("codesCracked");
  const cracked = count ? parseInt(count, 10) : 0;
  const status = getHackerStatus(cracked);

  const themeOrder = [
    "Beginner",
    "Script Kiddie",
    "Key Cracker",
    "Code Phantom",
    "Cyber Architect",
    "Master",
  ];

  const unlocked = themeOrder.slice(0, themeOrder.indexOf(status.title) + 1);
  const saved = await getTheme();

  setSelected(saved);
  setUnlockedThemes(unlocked);
};
loadStatus();

  const handleSelect = async (themeName) => {
    await setTheme(themeName);       // updates context + storage
    setSelected(themeName);          // update local UI state
  };

const renderItem = ({ item }) => {
  const isActive = item.name === selected;
  const isUnlocked = unlockedThemes.includes(item.name);

  return (
    <TouchableOpacity
      disabled={!isUnlocked}
      onPress={() => handleSelect(item.name)}
      style={[
        styles.themeItem,
        isActive && styles.selected,
        !isUnlocked && { opacity: 0.4 }
      ]}
    >
      <View style={[styles.colorPreview, { backgroundColor: item.color }]} />

      <Text
        style={[
          styles.themeText,
          isActive && { color: item.color },
          !isUnlocked && { color: "#555" },
        ]}
      >
        {item.name}
      </Text>

      {!isUnlocked && (
        <Icon name="lock" size={16} color="#555" style={styles.lockIcon} />
      )}
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
  lockIcon: {
    marginLeft: 8,
  },

});
