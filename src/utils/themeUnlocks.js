/**
 * Returns an array of unlocked bonus theme keys
 * @param {Object} params
 * @param {number} params.cracked - Number of codes cracked
 * @param {number} params.level - Player level
 * @param {Array<string>} params.adsWatched - Array of ad keys the player has watched
 * @param {Array<string>} params.challengesCompleted - Array of completed challenge keys
 * @returns {Array<string>}
 */
export const getUnlockedBonusThemes = ({
  cracked = 0,
  level = 1,
  adsWatched = [],
  challengesCompleted = [],
}) => {
  const unlocked = [];

  // Unlock from ad
  if (adsWatched.includes("cyberGlow")) {
    unlocked.push("ad_cyber");
  }

  // Unlock from level
  if (level >= 5) {
    unlocked.push("level_5");
  }

  // Unlock from challenge
  if (challengesCompleted.includes("pulseChallenge")) {
    unlocked.push("challenge_pulse");
  }

  return unlocked;
};
