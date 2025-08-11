// src/utils/evaluateGuess.js
export default function evaluateGuess(secret, guess) {
  const n = secret.length;
  const feedback = Array(n).fill("red");
  const secretUsed = Array(n).fill(false);
  const guessUsed = Array(n).fill(false);

  // Greens
  for (let i = 0; i < n; i++) {
    if (guess[i] === secret[i]) {
      feedback[i] = "green";
      secretUsed[i] = true;
      guessUsed[i] = true;
    }
  }
  // Yellows
  for (let i = 0; i < n; i++) {
    if (guessUsed[i]) continue;
    for (let j = 0; j < n; j++) {
      if (!secretUsed[j] && guess[i] === secret[j]) {
        feedback[i] = "yellow";
        secretUsed[j] = true;
        guessUsed[i] = true;
        break;
      }
    }
  }
  return feedback;
}
