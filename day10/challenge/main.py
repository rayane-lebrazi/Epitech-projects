import sys

ones = [
    "zero", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen"
]

tens = [
    "", "", "twenty", "thirty", "forty",
    "fifty", "sixty", "seventy", "eighty", "ninety"
]


def number_to_words(n):
    if n < 20:
        return ones[n]

    if n < 100:
        if n % 10 == 0:
            return tens[n // 10]
        return tens[n // 10] + "-" + ones[n % 10]

    if n < 1000:
        if n % 100 == 0:
            return ones[n // 100] + " hundred"
        return ones[n // 100] + " hundred and " + number_to_words(n % 100)

    if n < 1000000:
        if n % 1000 == 0:
            return number_to_words(n // 1000) + " thousand"
        if n % 1000 < 100:
            return number_to_words(n // 1000) + " thousand and " + number_to_words(n % 1000)
        return number_to_words(n // 1000) + " thousand " + number_to_words(n % 1000)

    raise ValueError("Number is too large")


def count_letters(text):
    return sum(1 for char in text if char.isalpha())


if len(sys.argv) != 2:
    print("Usage: python3 main.py N")
    sys.exit(1)

try:
    n = int(sys.argv[1])
    if n < 1:
        raise ValueError
except ValueError:
    print("N must be a positive integer")
    sys.exit(1)

total = 0

for number in range(1, n + 1):
    total += count_letters(number_to_words(number))

print(total)
