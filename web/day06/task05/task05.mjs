export function range(start, end, step) {
  if (step === undefined) {
    step = start < end ? 1 : -1;
  }

  if (step === 0) {
    return [];
  }

  const values = [];
  const movesTowardEnd = start <= end ? step > 0 : step < 0;

  if (!movesTowardEnd) {
    return values;
  }

  if (step > 0) {
    for (let value = start; value <= end; value += step) {
      values.push(value);
    }
  } else {
    for (let value = start; value >= end; value += step) {
      values.push(value);
    }
  }

  return values;
}
