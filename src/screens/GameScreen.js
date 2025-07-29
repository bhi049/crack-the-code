import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import generateCode from '../utils/generateCode';
import evaluateGuess from '../utils/evaluateGuess';
import GuessRow from '../components/GuessRow';
import Keypad from '../components/Keypad';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameScreen({ navigation }) {
  const [secretCode, setSecretCode] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    const code = generateCode();
    setSecretCode(code);
    setCurrentGuess([]);
    setGuesses([]);
  }, []);

  const handleKeypadPress = (key) => {
    if (key === '⌫') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === '↩') {
      if (currentGuess.length !== 4) {
        Alert.alert('Enter 4 digits');
        return;
      }

      const feedback = evaluateGuess(secretCode, currentGuess);
      const newGuess = {
        guess: currentGuess,
        feedback,
      };

      setGuesses((prev) => [...prev, newGuess]);
      setCurrentGuess([]);

      if (feedback.every((f) => f === 'green')) {
        incrementCrackedCount();
        navigation.replace('Win');
      }
    } else if (currentGuess.length < 4 && /^[0-9]$/.test(key)) {
      setCurrentGuess((prev) => [...prev, parseInt(key)]);
    }
  };

  const incrementCrackedCount = async () => {
    const stored = await AsyncStorage.getItem('codesCracked');
    const count = stored ? parseInt(stored, 10) : 0;
    await AsyncStorage.setItem('codesCracked', (count + 1).toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ENTER CODE</Text>

      <View style={styles.current}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Text key={i} style={styles.digit}>
            {currentGuess[i] !== undefined ? currentGuess[i] : '_'}
          </Text>
        ))}
      </View>

      <View style={styles.guessList}>
        {guesses.map((g, i) => (
          <GuessRow key={i} guess={g.guess} feedback={g.feedback} />
        ))}
      </View>

      <Keypad onKeyPress={handleKeypadPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: '#00ff99',
    fontFamily: 'Courier',
    marginBottom: 16,
  },
  current: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  digit: {
    fontSize: 32,
    color: '#00ff99',
    fontFamily: 'Courier',
  },
  guessList: {
    flex: 1,
    marginTop: 12,
  },
});
