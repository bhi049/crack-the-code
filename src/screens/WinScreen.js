import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HackerButton from '../components/HackerButton';

export default function WinScreen({ navigation, route }) {
  const { result, code } = route.params || {};
  const isWin = result === 'win';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isWin ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
      </Text>

      <Text style={styles.subtitle}>
        {isWin ? 'Code successfully cracked.' : 'System locked you out.'}
      </Text>

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
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff99',
    fontFamily: 'Courier',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#00ff99',
    fontFamily: 'Courier',
    marginBottom: 40,
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
