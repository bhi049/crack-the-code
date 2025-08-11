import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";
import StreakBadge from "../components/StreakBadge";
import WeeklyCalendar from "../components/WeeklyCalendar";
import HackerButton from "../components/HackerButton";

// helpers
const pad2 = (n) => (n < 10 ? "0" + n : "" + n);
const dateKey = (d = new Date()) => `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;

const DAILY_XP_REWARD = 300;

export default function DailyOverviewScreen({ navigation }) {
  const { color } = useContext(ThemeContext);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [successDates, setSuccessDates] = useState([]);
  const [completedToday, setCompletedToday] = useState(null); // 'win' | 'lose' | null

  useEffect(() => {
    const load = async () => {
      const s = await AsyncStorage.getItem("dailyStreak");
      setDailyStreak(s ? parseInt(s, 10) : 0);

      const raw = await AsyncStorage.getItem("dailySuccessDates");
      let parsed = [];
      try { parsed = raw ? JSON.parse(raw) : []; } catch (e) {}
      setSuccessDates(Array.isArray(parsed) ? parsed : []);

      const today = dateKey();
      const done = await AsyncStorage.getItem(`dailyCompleted_${today}`);
      setCompletedToday(done || null);
    };
    const unsub = navigation.addListener("focus", load);
    return unsub;
  }, [navigation]);

  const canPlay = completedToday === null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color }]}>DAILY CRACK</Text>
        <Text style={styles.subtle}>One shared code each day. 4–6 digits, no repeats.</Text>

        <View style={styles.topBlock}>
          <WeeklyCalendar successDates={successDates} color={color} />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>• XP Reward: +{DAILY_XP_REWARD}</Text>
          <Text style={styles.infoText}>• Base attempts: 6</Text>
          <Text style={styles.infoText}>• Fail or skip a day = streak resets</Text>
        </View>

        <View style={styles.cta}>
          {canPlay ? (
            <HackerButton title="CRACK TODAY'S CODE" onPress={() => navigation.navigate("DailyCrack")} />
          ) : (
            <View style={styles.lockedWrap}>
              <Text style={[styles.lockedTitle, completedToday === "win" ? styles.win : styles.lose]}>
                {completedToday === "win" ? "ACCESS GRANTED" : "ACCESS DENIED"}
              </Text>
              <Text style={styles.subtle}>
                {completedToday === "win"
                  ? "You’ve completed today’s challenge. Come back tomorrow!"
                  : "No more attempts today. Try again tomorrow."}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a0a0a" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  back: { fontFamily: "Courier", fontSize: 16, marginBottom: 8 },
  title: { fontFamily: "Courier", fontSize: 20, textAlign: "center", marginBottom: 4 },
  subtle: { color: "#888", fontFamily: "Courier", fontSize: 12, textAlign: "center" },
  topBlock: { marginTop: 12, gap: 10 },
  info: { marginTop: 12, gap: 6, paddingHorizontal: 6 },
  infoText: { color: "#ccc", fontFamily: "Courier", fontSize: 13, textAlign: "center" },
  cta: { marginTop: 24 },
  lockedWrap: { alignItems: "center", gap: 6 },
  lockedTitle: { fontFamily: "Courier", fontSize: 18 },
  win: { color: "#21c55d" },
  lose: { color: "#ef4444" },
});
