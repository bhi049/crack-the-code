import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HackerButton from '../components/HackerButton';
import { ThemeContext } from '../context/ThemeContext';

export default function WinScreen({ navigation, route }) {
  const { result, code, xp = 0 } = route.params || {};
  const isWin = result === 'win';
  const { color } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>
        {isWin ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
      </Text>

      <Text style={[styles.subtitle, { color }]}>
        {isWin ? 'Code successfully cracked.' : 'System locked you out.'}
      </Text>

      {isWin && (
        <Text style={[styles.xpText, { color }]}>
          +{xp} XP earned
        </Text>
      )}

      {!isWin && code && (
        <Text style={styles.codeReveal}>Code was: {code.join(' ')}</Text>
      )}

      <View style={styles.buttons}>
        <HackerButton title="CRACK NEXT CODE" onPress={() => navigation.replace('Game')} />
        <HackerButton title="HOME" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Courier',
    marginBottom: 20,
    textAlign: 'center',
  },
  xpText: {
    fontSize: 18,
    fontFamily: 'Courier',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeReveal: {
    color: '#ff4444',
    fontSize: 18,
    marginVertical: 20,
    fontFamily: 'Courier',
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: 16,
  },
});
