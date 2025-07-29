export default function generateCode() {
  const code = [];
  while (code.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    code.push(digit);
  }
  return code;
}