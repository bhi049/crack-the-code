import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AttemptProgress({ current, max }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Attempt {current} / {max}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    alignItems: 'center',
  },
  text: {
    color: '#00ff99',
    fontSize: 16,
    fontFamily: 'Courier',
  },
});