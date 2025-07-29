import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AttemptProgress from "../components/AttemptProgress";
import generateCode from "../utils/generateCode";
import evaluateGuess from "../utils/evaluateGuess";
import GuessRow from "../components/GuessRow";
import Keypad from "../components/Keypad";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GameScreen({ navigation }) {
  const [secretCode, setSecretCode] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);

  const scrollRef = useRef();

  const MAX_GUESSES = 10;

  useEffect(() => {
    const code = generateCode();
    setSecretCode(code);
    setCurrentGuess([]);
    setGuesses([]);
  }, []);

  const handleKeypadPress = (key) => {
    if (key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "↩") {
      if (currentGuess.length !== 4) {
        Alert.alert("Enter 4 digits");
        return;
      }

      const feedback = evaluateGuess(secretCode, currentGuess);
      const newGuess = {
        guess: currentGuess,
        feedback,
      };

      const newGuessList = [...guesses, newGuess];
      setGuesses(newGuessList);
      setCurrentGuess([]);

      const isWin = feedback.every((f) => f === "green");
      const isLastAttempt = newGuessList.length >= MAX_GUESSES;

      if (isWin) {
        incrementCrackedCount();
        navigation.replace("Win", { result: "win" });
      } else if (isLastAttempt) {
        navigation.replace("Win", { result: "lose", code: secretCode });
      }
    } else if (currentGuess.length < 4 && /^[0-9]$/.test(key)) {
      setCurrentGuess((prev) => [...prev, parseInt(key)]);
    }
  };

  const incrementCrackedCount = async () => {
    const stored = await AsyncStorage.getItem("codesCracked");
    const count = stored ? parseInt(stored, 10) : 0;
    await AsyncStorage.setItem("codesCracked", (count + 1).toString());
  };

  const groupGuessesIntoPages = (guesses, pageSize = 5) => {
  const pages = [];
  for (let i = 0; i < guesses.length; i += pageSize) {
    pages.push(guesses.slice(i, i + pageSize));
  }
  return pages;
};

const guessPages = groupGuessesIntoPages(guesses);


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* TOP SECTION */}
        <View style={styles.gameContent}>
          <Text style={styles.header}>ENTER CODE</Text>

          <View style={styles.current}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Text key={i} style={styles.digit}>
                {currentGuess[i] !== undefined ? currentGuess[i] : "_"}
              </Text>
            ))}
          </View>

          <AttemptProgress current={guesses.length + 1} max={MAX_GUESSES} />

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

        </View>

        {/* FIXED KEYPAD */}
        <View style={styles.keypadWrapper}>
          <Keypad onKeyPress={handleKeypadPress} />
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
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 16,
  },
  gameContent: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    color: "#00ff99",
    fontFamily: "Courier",
    marginBottom: 16,
  },
  current: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  digit: {
    fontSize: 32,
    color: "#00ff99",
    fontFamily: "Courier",
  },
  guessList: {
    flexGrow: 0,
    maxHeight: 320, // was 250 — now fits more guesses
    marginBottom: 10,
    position: "relative",
  },
  guessListContent: {
    paddingBottom: 4,
  },
  keypadWrapper: {
    paddingBottom: 16,
  },
});
