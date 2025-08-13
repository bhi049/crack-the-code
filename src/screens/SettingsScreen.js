import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from "react-native";
import { PrefsContext } from "../context/PrefsContext";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen({ navigation }) {
  const { color } = useContext(ThemeContext);
  const { haptics, setHaptics } = useContext(PrefsContext);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.header, { color }]}>SETTINGS</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Vibration (Haptics)</Text>
          <Switch
            value={haptics}
            onValueChange={setHaptics}
            thumbColor={haptics ? "#fff" : "#666"}
            trackColor={{ false: "#333", true: color }}
          />
        </View>

        {/* Future settings go here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a0a0a" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  back: { fontFamily: "Courier", fontSize: 16, marginBottom: 8 },
  header: { fontFamily: "Courier", fontSize: 20, textAlign: "center", marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    padding: 14,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  label: { color: "#ccc", fontFamily: "Courier", fontSize: 16 },
});
