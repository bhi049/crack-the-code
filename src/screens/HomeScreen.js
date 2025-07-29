import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HackerButton from '../components/HackerButton';

export default function HomeScreen({ navigation }) {
  const [codesCracked, setCodesCracked] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const count = await AsyncStorage.getItem('codesCracked');
      setCodesCracked(count ? parseInt(count, 10) : 0);
    };
    const unsubscribe = navigation.addListener('focus', loadCount);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CODES CRACKED: {codesCracked}</Text>

      <View style={styles.buttons}>
        <HackerButton title="CRACK CODE" onPress={() => navigation.navigate('Game')} />
        <HackerButton title="SETTINGS" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: '#00ff99',
    fontFamily: 'Courier',
    marginBottom: 40,
  },
  buttons: {
    width: '100%',
    gap: 20,
  },
});