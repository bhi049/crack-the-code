import { useContext } from "react";
import * as Haptics from "expo-haptics";
import { PrefsContext } from "../context/PrefsContext";

export default function useHaptics() {
  const { haptics } = useContext(PrefsContext);

  const tap = () => {
    if (haptics) {
      Haptics.selectionAsync(); // small "click" feel
    }
  };

  return { tap };
}
