import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function StatusBadge({ status }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>YOUR STATUS:</Text>
      <View style={styles.statusRow}>
        <Image source={status.image} style={styles.image} resizeMode="contain" />
        <Text style={[styles.text, { color: status.color }]}>{status.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#00ff99',
    fontSize: 14,
    fontFamily: 'Courier',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 28,
    height: 28,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Courier',
  },
});
