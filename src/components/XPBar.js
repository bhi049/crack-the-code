import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getXPProgress } from '../utils/xp';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

export default function XPBar() {
  const [xp, setXP] = useState(0);
  const { color } = useContext(ThemeContext);

  useEffect(() => {
    const loadXP = async () => {
      const stored = await AsyncStorage.getItem('xp');
      setXP(stored ? parseInt(stored, 10) : 0);
    };
    loadXP();
  }, []);

  const { level, currentLevelXP, nextLevelXP, progress } = getXPProgress(xp);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color }]}>LEVEL {level}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.xp, { color }]}>
        {xp} / {nextLevelXP} XP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Courier',
    marginBottom: 4,
  },
  bar: {
    height: 8,
    backgroundColor: '#222',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  xp: {
    fontSize: 12,
    fontFamily: 'Courier',
    marginTop: 4,
    textAlign: 'right',
  },
});
