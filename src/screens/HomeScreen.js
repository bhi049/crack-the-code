import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HackerButton from "../components/HackerButton";
import getHackerStatus from "../utils/getHackerStatus";
import StatusBadge from "../components/StatusBadge";
import XPBar from "../components/XPBar";
import { ThemeContext } from "../context/ThemeContext";
import UnlockPopup from "../components/UnlockPopup";

export default function HomeScreen({ navigation }) {
  const [codesCracked, setCodesCracked] = useState(100);
  const [showPopup, setShowPopup] = useState(false);
  const [unlockedStatus, setUnlockedStatus] = useState(null);
  const hackerStatus = getHackerStatus(codesCracked);
  const { color } = useContext(ThemeContext);

  useEffect(() => {
    const loadCount = async () => {
      const count = await AsyncStorage.getItem("codesCracked");
      const cracked = count ? parseInt(count, 10) : 0;
      setCodesCracked(cracked);

      const newStatus = getHackerStatus(cracked);
      const previousStatus = await AsyncStorage.getItem("lastStatus");

      if (previousStatus !== newStatus.title) {
        await AsyncStorage.setItem("lastStatus", newStatus.title);
        setUnlockedStatus(newStatus);
        setShowPopup(true);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadCount);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBadge status={hackerStatus} />
        <XPBar />

        <View style={styles.centeredContent}>
          <Text style={[styles.header, { color }]}>CODES CRACKED: {codesCracked}</Text>

          <View style={styles.buttons}>
            <HackerButton
              title="CRACK CODE"
              onPress={() => navigation.navigate("Game")}
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
      </View>
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
    fontSize: 20,
    fontFamily: "Courier",
    marginBottom: 40,
  },
  buttons: {
    width: "100%",
    gap: 20,
  },
});
