import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
const isoDate = (d = new Date()) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const getLast7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
};

const dayLabel = (d) => ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];

export default function WeeklyCalendar({ successDates = [], color = "#00ff99" }) {
  const successSet = useMemo(() => new Set(successDates || []), [successDates]);
  const days = useMemo(() => getLast7Days(), []);
  const todayIso = isoDate();

  return (
    <View style={styles.container}>
      {days.map((d, i) => {
        const dIso = isoDate(d);
        const isSuccess = successSet.has(dIso);
        const isToday = dIso === todayIso;
        return (
          <View key={i} style={styles.cell}>
            <Text style={styles.label}>{dayLabel(d)}</Text>
            <View style={[styles.dotWrap, isToday && { borderColor: color }]}>
              <View
                style={[
                  styles.dot,
                  isSuccess ? { backgroundColor: color } : { backgroundColor: "#333" },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: 10,
  },
  cell: { alignItems: "center", width: 40 },
  label: { color: "#aaa", fontFamily: "Courier", fontSize: 12, marginBottom: 6 },
  dotWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
