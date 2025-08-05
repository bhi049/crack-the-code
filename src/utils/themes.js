// Themes unlocked by player status (based on cracked code count)
export const STATUS_THEMES = {
  Beginner: { name: "Beginner", color: "#00ff99" },
  "Script Kiddie": { name: "Script Kiddie", color: "#f3b600" },
  "Key Cracker": { name: "Key Cracker", color: "#ff7e00" },
  "Code Phantom": { name: "Code Phantom", color: "#33f0dc" },
  "Cyber Architect": { name: "Cyber Architect", color: "#b466ff" },
  Master: { name: "Master", color: "#ff4444" },
};

// Bonus unlockable themes (ads, levels, challenges etc.)
export const BONUS_THEMES = [
  {
    name: "Cyber Glow",
    color: "#39f",
    unlock: "Watch Ad",
    key: "ad_cyber", // store this as string in unlockedBonusThemes
  },
  {
    name: "Sharp Hacker",
    color: "#f39",
    unlock: "Reach Level 5",
    key: "level_5",
  },
  {
    name: "Neon Pulse",
    color: "#0ff",
    unlock: "Complete Challenge",
    key: "challenge_pulse",
  },
];
