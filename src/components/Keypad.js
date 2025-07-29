import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['⌫', '0', '↩'],
];

export default function Keypad({ onKeyPress }) {
  return (
    <View style={styles.container}>
      {KEYS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.text}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  key: {
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#00ff99',
    borderRadius: 8,
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#00ff99',
    fontSize: 22,
    fontFamily: 'Courier',
  },
});
