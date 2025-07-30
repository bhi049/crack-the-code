import React, { createContext, useEffect, useState } from 'react';
import { getTheme, setTheme as saveTheme } from '../utils/storage';
import { THEMES } from '../utils/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('Beginner');
  const [color, setColor] = useState(THEMES.Beginner.color);

  const applyTheme = (name) => {
    const theme = THEMES[name] || THEMES.Beginner;
    setThemeName(theme.name);
    setColor(theme.color);
  };

  const setTheme = async (name) => {
    await saveTheme(name);
    applyTheme(name);
  };

  const loadTheme = async () => {
    const stored = await getTheme();
    applyTheme(stored);
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, color, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
