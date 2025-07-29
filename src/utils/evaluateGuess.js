export default function evaluateGuess(secret, guess) {
  const feedback = Array(4).fill('red');
  const secretUsed = Array(4).fill(false);
  const guessUsed = Array(4).fill(false);

  // 1. First pass: check for correct digit & position (green)
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      feedback[i] = 'green';
      secretUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  // 2. Second pass: check for correct digit in wrong place (yellow)
  for (let i = 0; i < 4; i++) {
    if (!guessUsed[i]) {
      for (let j = 0; j < 4; j++) {
        if (!secretUsed[j] && guess[i] === secret[j]) {
          feedback[i] = 'yellow';
          secretUsed[j] = true;
          break;
        }
      }
    }
  }

  return feedback;
}
