import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RetryPrompt({
  visible,
  onGiveUp,
  onContinue,
  used = 0,
  max = 2,
  color = "#00ff99",
  title = "Out of attempts",
  message = "Watch an ad to get +2 attempts?",
  continueText = "Continue",
  giveUpText = "Give Up",
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={[styles.title, { color }]}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.meterRow}>
            <View style={styles.meterTrack}>
              <View
                style={[
                  styles.meterFill,
                  { width: `${Math.min(used / max, 1) * 100}%`, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={[styles.meterText, { color }]}>{used} / {max}</Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onGiveUp} style={[styles.btn, styles.btnGhost, { borderColor: color }]}>
              <Text style={[styles.btnGhostText, { color }]}>{giveUpText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onContinue}
              disabled={used >= max}
              style={[
                styles.btn,
                { backgroundColor: used >= max ? "#2b2b2b" : color, opacity: used >= max ? 0.6 : 1 },
              ]}
            >
              <Text style={[styles.btnText, { color: used >= max ? "#777" : "#000" }]}>{continueText}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>You can watch up to {max} ads per day.</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "84%",
    backgroundColor: "#0e0e0e",
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  title: { fontFamily: "Courier", fontSize: 18, textAlign: "center", marginBottom: 8 },
  message: { fontFamily: "Courier", color: "#cfcfcf", fontSize: 13, textAlign: "center", marginBottom: 14 },
  meterRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  meterTrack: { flex: 1, height: 8, backgroundColor: "#222", borderRadius: 4, overflow: "hidden" },
  meterFill: { height: "100%" },
  meterText: { fontFamily: "Courier", fontSize: 12 },
  buttons: { flexDirection: "row", gap: 10, marginTop: 2 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  btnText: { fontFamily: "Courier", fontSize: 14 },
  btnGhost: { backgroundColor: "transparent", borderWidth: 1 },
  btnGhostText: { fontFamily: "Courier", fontSize: 14 },
  hint: { marginTop: 10, textAlign: "center", color: "#8a8a8a", fontFamily: "Courier", fontSize: 11 },
});
