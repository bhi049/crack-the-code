import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PrefsContext = createContext();

export function PrefsProvider({ children }) {
  const [haptics, setHapticsState] = useState(true);

  // Load prefs on mount
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("prefs_haptics");
      if (stored !== null) {
        setHapticsState(stored === "true");
      }
    })();
  }, []);

  // Save prefs when changed
  const setHaptics = async (value) => {
    setHapticsState(value);
    await AsyncStorage.setItem("prefs_haptics", value.toString());
  };

  return (
    <PrefsContext.Provider value={{ haptics, setHaptics }}>
      {children}
    </PrefsContext.Provider>
  );
}
