import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FeedbackDots({ feedback }) {
  return (
    <View style={styles.row}>
      {feedback.map((color, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            color === 'green' && styles.green,
            color === 'yellow' && styles.yellow,
            color === 'red' && styles.red,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  green: {
    backgroundColor: '#00ff99',
  },
  yellow: {
    backgroundColor: '#ffff00',
  },
  red: {
    backgroundColor: '#ff3333',
  },
});
