import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { saveAdWatched, getTheme } from "../utils/storage";

export default function ThemePreviewModal({
  visible,
  onClose,
  theme,
  unlocked,
  onSelect,
  onUnlock,
}) {
  const { applyTheme } = useContext(ThemeContext);
  const [originalTheme, setOriginalTheme] = useState(null);

  useEffect(() => {
    const handlePreview = async () => {
      if (visible && theme) {
        const current = await getTheme();
        setOriginalTheme(current);
        applyTheme(theme.name); // apply preview
      }
    };

    handlePreview();

    // On cleanup (when modal is closed), restore the original theme if not selected
    return () => {
      if (originalTheme && !unlocked) {
        applyTheme(originalTheme);
      }
    };
  }, [visible, theme]);

  const handleWatchAd = async () => {
    await new Promise((res) => setTimeout(res, 2000)); // Simulate ad
    await saveAdWatched(theme.key);
    onUnlock(theme.key);
    onClose();
  };

  if (!theme) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={[styles.header, { color: theme.color }]}>
            Theme: {theme.name}
          </Text>

          <View style={[styles.preview, { backgroundColor: theme.color }]}>
            <Text style={styles.previewText}>Preview</Text>
          </View>

          {!unlocked && (
            <Text style={styles.requirement}>🔒 Unlock: {theme.unlock}</Text>
          )}

          {unlocked ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onSelect(theme.name);
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Select Theme</Text>
            </TouchableOpacity>
          ) : theme.unlock === "Watch Ad" ? (
            <TouchableOpacity style={styles.button} onPress={handleWatchAd}>
              <Text style={styles.buttonText}>Watch Ad to Unlock</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#111",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontFamily: "Courier",
    marginBottom: 16,
  },
  preview: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  previewText: {
    color: "#000",
    fontFamily: "Courier",
    fontSize: 16,
  },
  requirement: {
    fontFamily: "Courier",
    color: "#888",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Courier",
    fontSize: 14,
  },
  closeButton: {
    marginTop: 4,
  },
  closeText: {
    color: "#888",
    fontFamily: "Courier",
    fontSize: 13,
  },
});
