import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/context/ThemeContext";
import { PrefsProvider } from "./src/context/PrefsContext";

import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import WinScreen from "./src/screens/WinScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DailyOverviewScreen from "./src/screens/DailyOverviewScreen";
import DailyCrackScreen from "./src/screens/DailyCrackScreen";
import ThemeScreen from "./src/screens/ThemeScreen";
import BadgesScreen from "./src/screens/BadgesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <PrefsProvider>
      {/* Set status bar icons/text to white on all screens */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="DailyOverview" component={DailyOverviewScreen} />
          <Stack.Screen name="DailyCrack" component={DailyCrackScreen} />
          <Stack.Screen name="Win" component={WinScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Theme" component={ThemeScreen} />
          <Stack.Screen name="Badges" component={BadgesScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </PrefsProvider>
    </ThemeProvider>
  );
}
