import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HackerButton from "../components/HackerButton";
import getHackerStatus from "../utils/getHackerStatus";
import StatusBadge from "../components/StatusBadge";
import XPBar from "../components/XPBar";
import { ThemeContext } from "../context/ThemeContext";
import UnlockPopup from "../components/UnlockPopup";
import StatusProgressModal from "../components/StatusProgressModal";
import StreakBadge from "../components/StreakBadge";
import { reconcileDailyStreak } from "../utils/daily";

export default function HomeScreen({ navigation }) {
  const [codesCracked, setCodesCracked] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [unlockedStatus, setUnlockedStatus] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const { color } = useContext(ThemeContext);
  const hackerStatus = getHackerStatus(codesCracked);

  useEffect(() => {
    const load = async () => {
      // codes cracked
      const count = await AsyncStorage.getItem("codesCracked");
      const cracked = count ? parseInt(count, 10) : 0;
      setCodesCracked(cracked);

      // reconcile streak if player missed a day; then read the value for display
      await reconcileDailyStreak();
      const s = await AsyncStorage.getItem("dailyStreak");
      setDailyStreak(s ? parseInt(s, 10) : 0);

      // status unlock popup
      const newStatus = getHackerStatus(cracked);
      const previousStatus = await AsyncStorage.getItem("lastStatus");
      if (previousStatus !== newStatus.title) {
        await AsyncStorage.setItem("lastStatus", newStatus.title);
        setUnlockedStatus(newStatus);
        setShowPopup(true);
      }
    };

    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBadge status={hackerStatus} />
        <XPBar />

        {dailyStreak > 0 && <StreakBadge streak={dailyStreak} color={color} />}

        <TouchableOpacity onPress={() => setShowStatusModal(true)}>
          <Text style={[styles.header, { color }]}>
            CODES CRACKED: {codesCracked}
          </Text>
        </TouchableOpacity>

        <StatusProgressModal
          visible={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          cracked={codesCracked}
        />

        <View style={styles.buttons}>
          <HackerButton
            title="CLASSIC MODE"
            onPress={() => navigation.navigate("Game")}
          />
          <HackerButton
            title="DAILY CRACK"
            onPress={() => navigation.navigate("DailyOverview")}
          />
          <HackerButton
            title="PROFILE"
            onPress={() => navigation.navigate("Profile")}
          />
          <HackerButton
            title="SETTINGS"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>

      <UnlockPopup
        visible={showPopup}
        status={unlockedStatus}
        onHide={() => setShowPopup(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
    fontFamily: "Courier",
    marginTop: 15,
    marginBottom: 25,
    textAlign: "center",
  },
  buttons: {
    width: "100%",
    gap: 20,
  },
  streakText: {
    fontSize: 18,
    fontFamily: "Courier",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});
