import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../context/ThemeContext";

const BADGES = [
  {
    name: "Beginner",
    threshold: 0,
    color: "#00ff99",
    src: require("../assets/badges/beginner.png"),
  },
  {
    name: "Script Kiddie",
    threshold: 5,
    color: "#f3b600",
    src: require("../assets/badges/script_kiddie.png"),
  },
  {
    name: "Key Cracker",
    threshold: 10,
    color: "#ff7e00",
    src: require("../assets/badges/key_cracker.png"),
  },
  {
    name: "Code Phantom",
    threshold: 25,
    color: "#33f0dc",
    src: require("../assets/badges/code_phantom.png"),
  },
  {
    name: "Cyber Architect",
    threshold: 50,
    color: "#b466ff",
    src: require("../assets/badges/cyber_architect.png"),
  },
  {
    name: "Master",
    threshold: 100,
    color: "#ff4444",
    src: require("../assets/badges/master.png"),
  },
];

export default function BadgesScreen({ navigation }) {
  const { color } = useContext(ThemeContext);
  const [cracked, setCracked] = useState(0);

  useEffect(() => {
    const load = async () => {
      const count = await AsyncStorage.getItem("codesCracked");
      setCracked(count ? parseInt(count, 10) : 0);
    };
    const unsub = navigation.addListener("focus", load);
    return unsub;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrap}>
          <Text style={[styles.back, { color }]}>← Back</Text>
        </TouchableOpacity>

        {/* Grid */}
        <View style={styles.grid}>
          {BADGES.map((b) => {
            const unlocked = cracked >= b.threshold;
            return (
              <View key={b.name} style={styles.tile}>
                <View style={styles.imageWrap}>
                  <Image source={b.src} style={styles.image} resizeMode="contain" />
                  {!unlocked && <View style={styles.lockOverlay} />}
                </View>
                <View style={styles.captionRow}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.caption,
                      { color: unlocked ? b.color : "#666" },
                    ]}
                  >
                    {b.name}
                  </Text>
                  {!unlocked && (
                    <Icon name="lock" size={14} color="#666" style={{ marginLeft: 6 }} />
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const TILE_SIZE = 84;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a0a0a" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  backWrap: { marginBottom: 8 },
  back: { fontFamily: "Courier", fontSize: 16 },

  grid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },

  tile: {
    width: (100 - 2 * 6) / 3 + "%", // 3 per row with gaps
    alignItems: "center",
  },

  imageWrap: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: { width: TILE_SIZE - 16, height: TILE_SIZE - 16 },

  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
  },

  captionRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: TILE_SIZE + 10,
  },
  caption: {
    fontFamily: "Courier",
    fontSize: 12,
  },
});
