import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function HackerButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111',
    borderColor: '#00ff99',
    borderWidth: 2,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#00ff99',
    fontSize: 18,
    fontFamily: 'Courier',
  },
});
