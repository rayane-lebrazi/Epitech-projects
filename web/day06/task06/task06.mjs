export function arrayFiltering(array, test) {
  const filtered = [];

  for (const value of array) {
    if (test(value)) {
      filtered.push(value);
    }
  }

  return filtered;
}
