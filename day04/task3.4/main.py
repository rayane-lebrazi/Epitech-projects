english = {
    "a": 8.2, "b": 1.5, "c": 2.8, "d": 4.3, "e": 12.7,
    "f": 2.2, "g": 2.0, "h": 6.1, "i": 7.0, "j": 0.15,
    "k": 0.77, "l": 4.0, "m": 2.4, "n": 6.7, "o": 7.5,
    "p": 1.9, "q": 0.095, "r": 6.0, "s": 6.3, "t": 9.1,
    "u": 2.8, "v": 0.98, "w": 2.4, "x": 0.15, "y": 2.0, "z": 0.074
}


text = input("Enter the encrypted text: ")
key_length = int(input("Enter the key length: "))

key = ""

for position in range(key_length):

    group = ""

    for i in range(position, len(text), key_length):
        if text[i].isalpha():
            group += text[i].lower()

    total_letters = len(group)

    scores = {}

    for shift in range(26):

        frequencies = {}

        for letter in group:

            decrypted_letter = chr((ord(letter) - ord('a') - shift) % 26 + ord('a'))
            if decrypted_letter in frequencies:
                frequencies[decrypted_letter] += 1
            else:
                frequencies[decrypted_letter] = 1

        score = 0

        for letter in english:

            if letter in frequencies:
                text_frequency = frequencies[letter] / total_letters * 100
            else:
                text_frequency = 0

            language_frequency = english[letter]

            difference = abs(text_frequency - language_frequency)

            score += difference

        scores[shift] = score

    best_shift = min(scores, key=scores.get)

    key += chr(ord('a') + best_shift)


print("\nDetected key:", key)


result = ""
key_position = 0

for letter in text:

    if letter.isalpha():

        shift = ord(key[key_position % len(key)]) - ord('a')

        if letter.islower():
            result += chr(
                (ord(letter) - ord('a') - shift) % 26 + ord('a')
            )
        else:
            result += chr(
                (ord(letter) - ord('A') - shift) % 26 + ord('A')
            )

        key_position += 1

    else:
        result += letter


print("\nDecrypted text:", result)