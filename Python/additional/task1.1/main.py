def count_types(text):
    vowels = "aeiou"
    vowel_count = 0
    consonant_count = 0

    for char in text.lower():
        if char.isalpha():
            if char in vowels:
                vowel_count += 1
            else:
                consonant_count += 1

    print(vowel_count, "vowels,", consonant_count, "consonants")