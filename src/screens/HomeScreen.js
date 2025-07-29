import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HackerButton from "../components/HackerButton";
import getHackerStatus from "../utils/getHackerStatus";
import StatusBadge from "../components/StatusBadge";

export default function HomeScreen({ navigation }) {
  const [codesCracked, setCodesCracked] = useState(100);
  const hackerStatus = getHackerStatus(codesCracked);

  useEffect(() => {
    const loadCount = async () => {
      const count = await AsyncStorage.getItem("codesCracked");
      setCodesCracked(count ? parseInt(count, 10) : 0);
    };
    const unsubscribe = navigation.addListener("focus", loadCount);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBadge status={hackerStatus} />

        <View style={styles.centeredContent}>
          <Text style={styles.header}>CODES CRACKED: {codesCracked}</Text>

          <View style={styles.buttons}>
            <HackerButton
              title="CRACK CODE"
              onPress={() => navigation.navigate("Game")}
            />
            <HackerButton
              title="SETTINGS"
              onPress={() => navigation.navigate("Settings")}
            />
          </View>
        </View>
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
    color: "#00ff99",
    fontFamily: "Courier",
    marginBottom: 40,
  },
  buttons: {
    width: "100%",
    gap: 20,
  },
});
