import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeedbackDots from './FeedbackDots';

export default function GuessRow({ guess, feedback }) {
  return (
    <View style={styles.row}>
      <View style={styles.digits}>
        {guess.map((digit, index) => (
          <Text key={index} style={styles.digit}>
            {digit}
          </Text>
        ))}
      </View>
      <FeedbackDots feedback={feedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  digits: {
    flexDirection: 'row',
    gap: 12,
  },
  digit: {
    fontSize: 24,
    color: '#00ff99',
    fontFamily: 'Courier',
  },
});
