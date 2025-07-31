import React, { useContext } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ConfirmModal({
  visible,
  onCancel,
  onConfirm,
  title = 'Are you sure?',
  confirmText = 'Yes',
  cancelText = 'No',
}) {
  const { color } = useContext(ThemeContext);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={[styles.title, { color }]}>{title}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, { borderColor: color }]}>
              <Text style={[styles.text, { color }]}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm} style={[styles.button, { borderColor: color }]}>
              <Text style={[styles.text, { color }]}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Courier',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Courier',
  },
});
