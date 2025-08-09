import React, { useEffect, useState, useContext } from "react";
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getHackerStatus from "../utils/getHackerStatus";
import { STATUS_THEMES, BONUS_THEMES } from "../utils/themes";
import { getUnlockedBonusThemes } from "../utils/themeUnlocks";
import { getTheme } from "../utils/storage";
import { ThemeContext } from "../context/ThemeContext";
import ThemePreviewModal from "../components/ThemePreviewModal";

export default function ProfileScreen({ navigation }) {
  const { setTheme, color } = useContext(ThemeContext);
  const [selected, setSelected] = useState("Beginner");
  const [unlockedThemes, setUnlockedThemes] = useState(["Beginner"]);
  const [unlockedBonusThemes, setUnlockedBonusThemes] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const [isStatusPreview, setIsStatusPreview] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      const count = await AsyncStorage.getItem("codesCracked");
      const cracked = count ? parseInt(count, 10) : 0;
      const status = getHackerStatus(cracked);
      const saved = await getTheme();

      const themeOrder = Object.keys(STATUS_THEMES);
      const unlocked = themeOrder.slice(0, themeOrder.indexOf(status.title) + 1);

      const level = await AsyncStorage.getItem("level") || 1;
      const adsWatched = JSON.parse(await AsyncStorage.getItem("adsWatched")) || [];
      const challengesCompleted = JSON.parse(await AsyncStorage.getItem("challengesCompleted")) || [];

      const bonus = getUnlockedBonusThemes({
        cracked,
        level: parseInt(level, 10),
        adsWatched,
        challengesCompleted,
      });

      setSelected(saved);
      setUnlockedThemes(unlocked);
      setUnlockedBonusThemes(bonus);
    };

    loadStatus();
  }, []);

  const handleSelect = async (themeName) => {
    await setTheme(themeName);
    setSelected(themeName);
  };

  const handleUnlock = (themeKey) => {
    setUnlockedBonusThemes((prev) => [...new Set([...prev, themeKey])]);
  };

  const handlePreview = (item, isStatus) => {
    setPreviewItem(item);
    setIsStatusPreview(isStatus);
  };

  const closeModal = () => {
    setPreviewItem(null);
  };

  const renderItem = (item, isStatusTheme) => {
    const isUnlocked = isStatusTheme
      ? unlockedThemes.includes(item.name)
      : unlockedBonusThemes.includes(item.key);

    const isActive = item.name === selected;

    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => {
          if (isUnlocked) {
            // Directly apply unlocked themes
            handleSelect(item.name);
          } else {
            // Open preview modal for locked themes
            handlePreview(item, isStatusTheme);
          }
        }}
        style={[
          styles.themeItem,
          isActive && styles.selected,
          !isUnlocked && { opacity: 0.4 },
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
          <Text style={styles.unlockText}>
            {isStatusTheme ? <Icon name="lock" size={16} color="#555" /> : ` ${item.unlock}`}
          </Text>
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

        <ScrollView contentContainerStyle={styles.list}>
          <Text style={[styles.subHeader, { color }]}>Status Themes</Text>
          {Object.values(STATUS_THEMES).map((item) => renderItem(item, true))}

          <Text style={[styles.subHeader, { color, marginTop: 30 }]}>Bonus Themes</Text>
          {BONUS_THEMES.map((item) => renderItem(item, false))}
        </ScrollView>
      </View>

      {/* Modal for previewing and selecting/unlocking themes */}
      <ThemePreviewModal
        visible={!!previewItem}
        theme={previewItem}
        unlocked={
          previewItem &&
          (isStatusPreview
            ? unlockedThemes.includes(previewItem.name)
            : unlockedBonusThemes.includes(previewItem.key))
        }
        onClose={closeModal}
        onSelect={handleSelect}
        onUnlock={handleUnlock}
      />
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
  subHeader: {
    fontSize: 16,
    fontFamily: "Courier",
    marginBottom: 12,
    marginTop: 12,
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
  unlockText: {
    marginLeft: "auto",
    fontFamily: "Courier",
    fontSize: 12,
    color: "#888",
  },
});
