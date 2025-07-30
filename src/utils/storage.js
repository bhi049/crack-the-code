import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTheme = async (themeName) => {
  await AsyncStorage.setItem('selectedTheme', themeName);
};

export const getTheme = async () => {
  const stored = await AsyncStorage.getItem('selectedTheme');
  return stored || 'Beginner'; // default
};
