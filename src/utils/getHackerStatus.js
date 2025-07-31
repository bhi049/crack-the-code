export default function getHackerStatus(count) {
  if (count >= 100) return { title: 'Master', image: require('../assets/badges/master.png'), color: '#ff4444' };
  if (count >= 50) return { title: 'Cyber Architect', image: require('../assets/badges/cyber_architect.png'), color: '#b466ff' };
  if (count >= 25) return { title: 'Code Phantom', image: require('../assets/badges/code_phantom.png'), color: '#3be2d0' };
  if (count >= 10) return { title: 'Key Cracker', image: require('../assets/badges/key_cracker.png'), color: '#ff9922' };
  if (count >= 5) return { title: 'Script Kiddie', image: require('../assets/badges/script_kiddie.png'), color: '#ffcc33' };
  return { title: 'Beginner', image: require('../assets/badges/beginner.png'), color: '#00ff99' };
}