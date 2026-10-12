export function drawTriangle(height) {
  for (let row = 1; row <= height; row++) {
    console.log('$'.repeat(row));
  }
}