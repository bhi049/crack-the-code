import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/context/ThemeContext";

import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import WinScreen from "./src/screens/WinScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DailyOverviewScreen from "./src/screens/DailyOverviewScreen";
import DailyCrackScreen from "./src/screens/DailyCrackScreen";
import ThemeScreen from "./src/screens/ThemeScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="DailyOverview" component={DailyOverviewScreen} />
          <Stack.Screen name="DailyCrack" component={DailyCrackScreen} />
          <Stack.Screen name="Win" component={WinScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Theme" component={ThemeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
