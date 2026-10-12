export function countGs(str) {
  let count = 0;

  for (const character of str) {
    if (character.toLowerCase() === 'g') {
      count++;
    }
  }

  return count;
}
