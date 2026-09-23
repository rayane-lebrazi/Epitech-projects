text = input("Enter a text: ")

frequencies = {}
total_letters = 0

for letter in text.lower():
    if letter.isalpha():
        total_letters += 1

        if letter in frequencies:
            frequencies[letter] += 1
        else:
            frequencies[letter] = 1

print("\nVotre frequences sont:")

for letter in frequencies:
    frequency = frequencies[letter] / total_letters
    percentage = frequency * 100

    print(letter, ":", frequencies[letter], "times -", round(percentage, 2), "%")



languages = {
    "English": {
        "a": 8.2, "b": 1.5, "c": 2.8, "d": 4.3, "e": 12.7,
        "f": 2.2, "g": 2.0, "h": 6.1, "i": 7.0, "j": 0.15,
        "k": 0.77, "l": 4.0, "m": 2.4, "n": 6.7, "o": 7.5,
        "p": 1.9, "q": 0.095, "r": 6.0, "s": 6.3, "t": 9.1,
        "u": 2.8, "v": 0.98, "w": 2.4, "x": 0.15, "y": 2.0, "z": 0.074
    },

    "French": {
        "a": 7.6, "b": 0.9, "c": 3.3, "d": 3.7, "e": 14.7,
        "f": 1.1, "g": 1.0, "h": 0.7, "i": 7.5, "j": 0.6,
        "k": 0.05, "l": 5.5, "m": 2.7, "n": 7.1, "o": 5.8,
        "p": 2.5, "q": 1.4, "r": 6.9, "s": 7.9, "t": 7.2,
        "u": 6.3, "v": 1.8, "w": 0.05, "x": 0.4, "y": 0.3, "z": 0.1
    },

    "Spanish": {
        "a": 12.5, "b": 1.4, "c": 4.7, "d": 5.9, "e": 13.7,
        "f": 0.7, "g": 1.0, "h": 1.2, "i": 6.2, "j": 0.5,
        "k": 0.0, "l": 4.9, "m": 3.1, "n": 6.7, "o": 8.7,
        "p": 2.5, "q": 0.9, "r": 6.9, "s": 7.9, "t": 4.6,
        "u": 3.9, "v": 0.9, "w": 0.0, "x": 0.2, "y": 1.0, "z": 0.5
    },

    "German": {
        "a": 6.5, "b": 1.9, "c": 3.1, "d": 5.1, "e": 17.4,
        "f": 1.7, "g": 3.0, "h": 4.8, "i": 7.6, "j": 0.3,
        "k": 1.2, "l": 3.4, "m": 2.5, "n": 9.8, "o": 2.5,
        "p": 0.8, "q": 0.0, "r": 7.0, "s": 7.3, "t": 6.2,
        "u": 4.2, "v": 0.7, "w": 1.9, "x": 0.0, "y": 0.0, "z": 1.1
    },

    "Italian": {
        "a": 11.7, "b": 0.9, "c": 4.5, "d": 3.7, "e": 11.8,
        "f": 1.0, "g": 1.6, "h": 1.5, "i": 11.3, "j": 0.0,
        "k": 0.0, "l": 6.5, "m": 2.5, "n": 6.9, "o": 9.8,
        "p": 3.1, "q": 0.5, "r": 6.4, "s": 5.5, "t": 5.6,
        "u": 3.0, "v": 2.1, "w": 0.0, "x": 0.0, "y": 0.0, "z": 0.9
    },

    "Portuguese": {
        "a": 14.6, "b": 1.0, "c": 3.9, "d": 5.3, "e": 12.6,
        "f": 1.0, "g": 1.3, "h": 1.3, "i": 6.2, "j": 0.5,
        "k": 0.0, "l": 2.8, "m": 4.7, "n": 5.0, "o": 10.7,
        "p": 2.5, "q": 1.2, "r": 6.5, "s": 7.8, "t": 4.3,
        "u": 4.6, "v": 1.7, "w": 0.0, "x": 0.2, "y": 0.0, "z": 0.5
    }
}


scores = {}

for language in languages:
    score = 0

    for letter in frequencies:
        if letter in languages[language]:
            text_frequency = frequencies[letter] / total_letters * 100
            language_frequency = languages[language][letter]

            difference = abs(text_frequency - language_frequency)

            score += difference

    scores[language] = score


detected_language = min(scores, key=scores.get)

print("\nLanguage:", detected_language)