import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function AttemptProgress({ current, max }) {
  const { color } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color }]}>
        Attempt {current} / {max}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Courier',
  },
});
