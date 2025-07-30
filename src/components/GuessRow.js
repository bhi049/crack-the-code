import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeedbackDots from './FeedbackDots';
import { ThemeContext } from '../context/ThemeContext';

export default function GuessRow({ guess, feedback }) {
  const { color } = useContext(ThemeContext);

  return (
    <View style={styles.row}>
      <View style={styles.digits}>
        {guess.map((digit, index) => (
          <Text key={index} style={[styles.digit, { color }]}>
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
    fontFamily: 'Courier',
  },
});
