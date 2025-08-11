// src/screens/DailyCrackScreen.js
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";

import AttemptProgress from "../components/AttemptProgress";
import GuessRow from "../components/GuessRow";
import Keypad from "../components/Keypad";
import ConfirmModal from "../components/ConfirmModal";
import evaluateGuess from "../utils/evaluateGuess";
import { reconcileDailyStreak } from "../utils/daily";

/* ---------- Config ---------- */
const BASE_MAX_ATTEMPTS = 6;
const EXTRA_ATTEMPTS_PER_AD = 2;
const MAX_AD_RETRIES_PER_DAY = 2;
const DAILY_XP_REWARD = 300;

/* ---------- Date helpers ---------- */
const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
const dateKey = (d = new Date()) =>
  `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
const isoDate = (d = new Date()) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/* ---------- Deterministic shared code (4–6 digits, no repeats) ---------- */
function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function seededRandom(seed) {
  let x = seed || 123456789;
  return () => {
    x ^= x << 13; x ^= x >> 17; x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}
function generateDailyCodeFor(dateStr) {
  const seed = hashString(dateStr);
  const rand = seededRandom(seed);
  const length = 4 + Math.floor(rand() * 3); // 4..6
  const pool = [0,1,2,3,4,5,6,7,8,9];
  const code = [];
  while (code.length < length) {
    const idx = Math.floor(rand() * pool.length);
    code.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return code;
}

export default function DailyCrackScreen({ navigation }) {
  const { color } = useContext(ThemeContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const [todayKey] = useState(dateKey());
  const [secret, setSecret] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);

  const [retriesUsed, setRetriesUsed] = useState(0);
  const [completed, setCompleted] = useState(false); // after win/lose
  const [result, setResult] = useState(null); // 'win' | 'lose' | null

  const scrollRef = useRef(null);

  const maxAttempts = BASE_MAX_ATTEMPTS + retriesUsed * EXTRA_ATTEMPTS_PER_AD;

  /* Mount: reconcile streak (in case they skipped yesterday), then prepare today's run */
  useEffect(() => {
    (async () => {
      await reconcileDailyStreak();

      setSecret(generateDailyCodeFor(todayKey));

      const storedRetries = await AsyncStorage.getItem(`dailyAdRetries_${todayKey}`);
      setRetriesUsed(storedRetries ? parseInt(storedRetries, 10) : 0);

      const status = await AsyncStorage.getItem(`dailyCompleted_${todayKey}`); // 'win'|'lose'
      if (status) {
        setCompleted(true);
        setResult(status);
      }
    })();
  }, [todayKey]);

  /* Keep guess list scrolled like Classic */
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [guesses.length]);

  const tryExit = () => setShowConfirm(true);

  const onKeyPress = async (key) => {
    if (completed) return;

    if (key === "⌫") {
      setCurrentGuess((p) => p.slice(0, -1));
      return;
    }

    if (key === "↩") {
      if (currentGuess.length !== secret.length) {
        Alert.alert(`Enter ${secret.length} digits`);
        return;
      }

      const feedback = evaluateGuess(secret, currentGuess);
      const next = [...guesses, { guess: currentGuess, feedback }];
      setGuesses(next);
      setCurrentGuess([]);

      const isWin = feedback.every((f) => f === "green");
      const outOfAttempts = next.length >= maxAttempts;

      if (isWin) {
        await handleWin();
        navigation.replace("Win", { result: "win", xp: DAILY_XP_REWARD });
      } else if (outOfAttempts) {
        if (retriesUsed < MAX_AD_RETRIES_PER_DAY) {
          Alert.alert(
            "Out of attempts",
            `Watch an ad to get +${EXTRA_ATTEMPTS_PER_AD} attempts?\n(${retriesUsed}/${MAX_AD_RETRIES_PER_DAY} ads used today)`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "Watch Ad", onPress: handleWatchAd },
            ]
          );
        } else {
          await handleLoseFinal();
          navigation.replace("Win", { result: "lose", code: secret });
        }
      }
      return;
    }

    if (/^[0-9]$/.test(key) && currentGuess.length < secret.length) {
      setCurrentGuess((p) => [...p, parseInt(key, 10)]);
    }
  };

  const handleWatchAd = async () => {
    if (retriesUsed >= MAX_AD_RETRIES_PER_DAY) return;
    await new Promise((r) => setTimeout(r, 1500)); // simulate ad
    const used = retriesUsed + 1;
    setRetriesUsed(used);
    await AsyncStorage.setItem(`dailyAdRetries_${todayKey}`, String(used));
    Alert.alert("Attempts Added", `+${EXTRA_ATTEMPTS_PER_AD} attempts granted.`);
  };

  const handleWin = async () => {
    await AsyncStorage.setItem(`dailyCompleted_${todayKey}`, "win");

    // Streak update
    const raw = await AsyncStorage.getItem("dailySuccessDates");
    const arr = raw ? JSON.parse(raw) : [];
    const last = arr[arr.length - 1] || null;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const prevStreak = parseInt((await AsyncStorage.getItem("dailyStreak")) || "0", 10);
    const nextStreak = last === isoDate(yesterday) ? prevStreak + 1 : 1;

    await AsyncStorage.setItem("dailyStreak", String(nextStreak));
    const todayISO = isoDate();
    if (!arr.includes(todayISO)) {
      arr.push(todayISO);
      await AsyncStorage.setItem("dailySuccessDates", JSON.stringify(arr));
    }

    // Global stats
    const cracked = parseInt((await AsyncStorage.getItem("codesCracked")) || "0", 10);
    await AsyncStorage.setItem("codesCracked", String(cracked + 1));

    const xpNow = parseInt((await AsyncStorage.getItem("xp")) || "0", 10);
    await AsyncStorage.setItem("xp", String(xpNow + DAILY_XP_REWARD));

    setCompleted(true);
    setResult("win");
  };

  const handleLoseFinal = async () => {
    await AsyncStorage.setItem(`dailyCompleted_${todayKey}`, "lose");
    await AsyncStorage.setItem("dailyStreak", "0");
    setCompleted(true);
    setResult("lose");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity onPress={tryExit}>
          <Text style={[styles.back, { color }]}>← Back</Text>
        </TouchableOpacity>

        {/* GAME AREA (mirrors Classic) */}
        <View style={styles.gameContent}>
          <Text style={[styles.header, { color }]}>ENTER CODE</Text>
          <Text style={styles.subtitle}>No repeated digits • {secret.length} digits</Text>

          {/* Current guess */}
          <View style={styles.current}>
            {Array.from({ length: secret.length }).map((_, i) => (
              <Text key={i} style={[styles.digit, { color }]}>
                {currentGuess[i] !== undefined ? currentGuess[i] : "_"}
              </Text>
            ))}
          </View>

          <AttemptProgress current={guesses.length + 1} max={maxAttempts} />

          <ScrollView
            ref={scrollRef}
            style={styles.guessList}
            contentContainerStyle={styles.guessListContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {guesses.map((g, i) => (
              <GuessRow key={i} guess={g.guess} feedback={g.feedback} />
            ))}
          </ScrollView>

          {/* Retry CTA */}
          {!completed &&
            guesses.length >= maxAttempts &&
            retriesUsed < MAX_AD_RETRIES_PER_DAY && (
              <View style={styles.retryBox}>
                <Text style={styles.retryText}>
                  No attempts left. Watch an ad to add {EXTRA_ATTEMPTS_PER_AD} attempts.
                </Text>
                <TouchableOpacity style={styles.retryBtn} onPress={handleWatchAd}>
                  <Text style={styles.retryBtnText}>Watch Ad</Text>
                </TouchableOpacity>
                <Text style={styles.retryMeta}>
                  Ads used {retriesUsed}/{MAX_AD_RETRIES_PER_DAY}
                </Text>
              </View>
            )}
        </View>

        {/* Fixed keypad */}
        {!completed && (
          <View style={styles.keypadWrapper}>
            <Keypad onKeyPress={onKeyPress} />
          </View>
        )}

        <ConfirmModal
          visible={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => navigation.goBack()}
          title="Exit today's challenge? Progress will be lost."
          confirmText="Exit"
          cancelText="Stay"
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0a0a0a" },
  container: { flex: 1, backgroundColor: "#0a0a0a", paddingHorizontal: 16 },

  back: { fontFamily: "Courier", marginBottom: 12, fontSize: 16 },

  gameContent: { flex: 1, paddingTop: 60 },
  header: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Courier",
    marginBottom: 4,
  },
  subtitle: {
    color: "#8a8a8a",
    textAlign: "center",
    fontFamily: "Courier",
    fontSize: 12,
    marginBottom: 12,
  },

  current: { flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 24 },
  digit: { fontSize: 32, fontFamily: "Courier" },

  guessList: { flexGrow: 0, maxHeight: 320, marginBottom: 10, position: "relative" },
  guessListContent: { paddingBottom: 4 },

  retryBox: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    backgroundColor: "#111",
  },
  retryText: { color: "#ccc", fontFamily: "Courier", fontSize: 13, textAlign: "center" },
  retryBtn: { marginTop: 8, backgroundColor: "#333", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  retryBtnText: { color: "#fff", fontFamily: "Courier", fontSize: 14 },
  retryMeta: { marginTop: 6, color: "#888", fontFamily: "Courier", fontSize: 12 },

  keypadWrapper: { paddingBottom: 16 },
});
