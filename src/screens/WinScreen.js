import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HackerButton from '../components/HackerButton';

export default function WinScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACCESS GRANTED</Text>
      <Text style={styles.subtitle}>Code successfully cracked.</Text>

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
  buttons: {
    width: '100%',
    gap: 16,
  },
});
