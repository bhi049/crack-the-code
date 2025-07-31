import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

export default function UnlockPopup({ visible, status, onHide }) {
  const translateY = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

      // Auto-hide
      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -200,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          })
        ]).start(() => {
          onHide();
        });
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.container, {
        opacity,
        transform: [{ translateY }],
        borderColor: status.color
      }]}
    >
      <Image source={status.image} style={styles.image} />
      <Text style={[styles.text, { color: status.color }]}>NEW STATUS UNLOCKED</Text>
      <Text style={[styles.name, { color: status.color }]}>{status.title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#111',
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 1000,
    elevation: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Courier',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
