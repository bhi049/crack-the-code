// src/components/FeedbackDots.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FeedbackDots({ feedback = [] }) {
  return (
    <View style={styles.row}>
      {feedback.map((f, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            f === 'green' && styles.green,
            f === 'yellow' && styles.yellow,
            f === 'red' && styles.red,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#444' },
  green: { backgroundColor: '#21c55d' },
  yellow: { backgroundColor: '#eab308' },
  red: { backgroundColor: '#ef4444' },
});
