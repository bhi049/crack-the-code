import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import useHaptics from "../hooks/useHaptics";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["⌫", "0", "↩"],
];

export default function Keypad({ onKeyPress }) {
  const { color } = useContext(ThemeContext);
  const { tap } = useHaptics(); 

  const handlePress = (key) => {
    tap();                 
    onKeyPress?.(key);
  };

  return (
    <View style={styles.container}>
      {KEYS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.key, { borderColor: color }]}
              onPress={() => handlePress(key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.text, { color }]}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, width: "100%" },
  row: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 12 },
  key: {
    backgroundColor: "#111",
    borderWidth: 2,
    borderRadius: 8,
    width: 80,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 22, fontFamily: "Courier" },
});
