import AsyncStorage from "@react-native-async-storage/async-storage";

const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
export const isoDate = (d = new Date()) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export async function reconcileDailyStreak() {
  try {
    const raw = await AsyncStorage.getItem("dailySuccessDates");
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr) || arr.length === 0) {
      // no successes yet → streak is whatever it is (likely 0)
      return;
    }

    const lastSuccess = arr[arr.length - 1]; // 'YYYY-MM-DD'
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayISO = isoDate(today);
    const yesterdayISO = isoDate(yesterday);

    // If last success is today or yesterday, streak is intact. Otherwise reset.
    const intact = lastSuccess === todayISO || lastSuccess === yesterdayISO;
    if (!intact) {
      await AsyncStorage.setItem("dailyStreak", "0");
    }
  } catch (e) {
    // fail-safe: do nothing
  }
}
