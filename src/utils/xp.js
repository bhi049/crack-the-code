// XP values per mode
export const XP_REWARDS = {
  Classic: 100,
  Blitz: 150,
  Hardline: 200,
  Daily: 300,
};

const BASE_XP = 100; // XP required to go from level 1 to 2

export function getLevelFromXP(xp) {
  let level = 1;
  while (xp >= getXPForLevel(level + 1)) {
    level++;
  }
  return level;
}

export function getXPForLevel(level) {
  return Math.floor((level - 1) * BASE_XP * level * 0.5);
}

export function getXPProgress(xp) {
  const level = getLevelFromXP(xp);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);
  const progress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);

  return {
    level,
    currentLevelXP,
    nextLevelXP,
    progress: Math.min(Math.max(progress, 0), 1),
  };
}

// XP gain by mode name
export function getXPRewardForMode(mode = 'Classic') {
  return XP_REWARDS[mode] || XP_REWARDS['Classic'];
}