import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { color } = useContext(ThemeContext);

  const MenuButton = ({ title, onPress, style }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.btn, style, { borderColor: color }]}
    >
      <Text style={[styles.btnText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color }]}>← Back</Text>
        </TouchableOpacity>

        {/* Grid */}
        <View style={styles.grid}>
          <View style={styles.row}>
            <MenuButton
              title="THEMES"
              onPress={() => navigation.navigate("Theme")}
              style={styles.square}
            />
            <MenuButton
              title="SOUND"
              onPress={() => Alert.alert("Coming soon", "Sound settings are on the way.")}
              style={styles.square}
            />
          </View>

          <MenuButton
            title="BADGES"
            onPress={() => Alert.alert("Coming soon", "Badges screen is on the way.")}
            style={styles.wide}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a0a0a" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  back: { fontFamily: "Courier", fontSize: 16, marginBottom: 16 },

  grid: {
    flex: 1,
    justifyContent: "center",
    gap: 24,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  btn: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f0f0f",
  },
  square: {
    width: 140,
    height: 100,
  },
  wide: {
    alignSelf: "center",
    width: 300,
    height: 70,
  },
  btnText: {
    fontFamily: "Courier",
    fontSize: 16,
    letterSpacing: 1,
  },
});
