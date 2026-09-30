import random
from english_words import get_english_words_set
words = get_english_words_set(["web2"], lower=True)

def words_of_length(words, n):
    return [word for word in words if len(word) == n]


def only_letters(words):
    return [word for word in words if word.isalpha()]


def group_by_length(words):
    result = {}

    for word in words:
        length = len(word)

        if length not in result:
            result[length] = []

        result[length].append(word)

    return result


length = int(input("Length: "))

filtered = words_of_length(words, length)

if filtered:
    print(random.choice(filtered))
else:
    print("No word found")