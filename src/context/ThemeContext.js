import React, { createContext, useEffect, useState } from 'react';
import { getTheme, setTheme as saveTheme } from '../utils/storage';
import { STATUS_THEMES, BONUS_THEMES } from '../utils/themes';

const ALL_THEMES = {
  ...STATUS_THEMES,
  ...BONUS_THEMES.reduce((acc, cur) => {
    acc[cur.name] = cur;
    return acc;
  }, {}),
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('Beginner');
  const [color, setColor] = useState(ALL_THEMES['Beginner'].color);

  const applyTheme = (name) => {
    const theme = ALL_THEMES[name] || ALL_THEMES['Beginner'];
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
    <ThemeContext.Provider value={{ themeName, color, setTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
