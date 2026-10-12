export function fizzBuzz(num) {
  const output = [];

  for (let value = 1; value <= num; value++) {
    if (value % 3 === 0 && value % 5 === 0) {
      output.push('FizzBuzz');
    } else if (value % 3 === 0) {
      output.push('Fizz');
    } else if (value % 5 === 0) {
      output.push('Buzz');
    } else {
      output.push(value);
    }
  }

  console.log(output.join(', '));
}
