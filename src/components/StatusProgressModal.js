import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const STATUS_TIERS = [
  { name: "Beginner", threshold: 0 },
  { name: "Script Kiddie", threshold: 5 },
  { name: "Key Cracker", threshold: 10 },
  { name: "Code Phantom", threshold: 25 },
  { name: "Cyber Architect", threshold: 50 },
  { name: "Master", threshold: 100 },
];

export default function StatusProgressModal({ visible, onClose, cracked }) {
  const { color } = useContext(ThemeContext);

  const currentIndex = STATUS_TIERS.findIndex(
    (tier, i) =>
      cracked >= tier.threshold &&
      (i === STATUS_TIERS.length - 1 || cracked < STATUS_TIERS[i + 1].threshold)
  );

  const current = STATUS_TIERS[currentIndex];
  const next = STATUS_TIERS[currentIndex + 1];

  const progress = next
    ? Math.min(
        1,
        (cracked - current.threshold) / (next.threshold - current.threshold)
      )
    : 1;

  const progressToNext = cracked;
  const neededToNext = next ? next.threshold : cracked;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={[styles.header, { color }]}>Status Progress</Text>

          <Text style={styles.text}>Current: {current.name}</Text>
          {next && <Text style={styles.text}>Next: {next.name}</Text>}

          {next && (
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
          )}

          {next && (
            <Text style={styles.progressText}>
              {progressToNext} / {neededToNext} Codes Cracked
            </Text>
          )}

          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.close, { color }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#111",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontFamily: "Courier",
    marginBottom: 12,
  },
  text: {
    color: "#ccc",
    fontFamily: "Courier",
    marginBottom: 4,
  },
  progressText: {
    color: "#888",
    fontFamily: "Courier",
    marginTop: 6,
    fontSize: 13,
  },
  barContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 5,
    marginTop: 12,
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
  close: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Courier",
  },
});
