import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const MILESTONES = [7, 14, 30, 60, 100];

export default function StreakBadge(props) {
  // Avoid destructuring + nullish operators to sidestep old RN/Metro quirks
  const streak = typeof props.streak === "number" ? props.streak : 0;
  const color = props.color ? props.color : "#00ff99";

  if (!(streak > 0)) return null;

  // Next milestone & progress
  let next = MILESTONES[MILESTONES.length - 1];
  for (let i = 0; i < MILESTONES.length; i++) {
    if (streak < MILESTONES[i]) {
      next = MILESTONES[i];
      break;
    }
  }
  const progress = Math.max(0, Math.min(1, streak / next));

  // Soft pulse (no native driver for layout color)
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const shadowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 0.35],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { borderColor: color, shadowColor: color, shadowOpacity: shadowOpacity },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.label, { color }]}>{/* left */}DAILY STREAK</Text>
        <Text style={[styles.value, { color }]}>{streak} days</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: (progress * 100).toString() + "%", backgroundColor: color }]} />
      </View>

      <View style={styles.row}>
        <Text style={styles.dim}>Next target</Text>
        <Text style={[styles.dim, { color }]}>{streak} / {next}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#0f0f0f",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    marginTop: 10,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { fontFamily: "Courier", letterSpacing: 1, fontSize: 12 },
  value: { fontFamily: "Courier", fontSize: 16 },
  track: { height: 8, borderRadius: 4, backgroundColor: "#242424", overflow: "hidden" },
  fill: { height: "100%" },
  dim: { color: "#888", fontFamily: "Courier", fontSize: 12 },
});
