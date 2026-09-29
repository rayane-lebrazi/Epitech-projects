import random
import argparse
import time
from english_words import get_english_words_set


THEMES = {
    "animals": [
        "cat", "dog", "lion", "tiger", "elephant",
        "giraffe", "monkey", "rabbit", "penguin", "dolphin"
    ],
    "technology": [
        "computer", "python", "keyboard", "monitor", "internet",
        "software", "hardware", "algorithm", "database", "developer"
    ],
    "food": [
        "pizza", "burger", "chocolate", "sandwich", "pasta",
        "cheese", "banana", "orange", "potato", "chicken"
    ],
    "countries": [
        "france", "morocco", "canada", "brazil", "germany",
        "italy", "japan", "spain", "portugal", "australia"
    ]
}


def choose_word(length=None, word_file=None, theme=None):
    if theme:
        words = THEMES[theme]
    elif word_file:
        with open(word_file, "r") as file:
            words = [line.strip().lower() for line in file if line.strip()]
    else:
        words = list(get_english_words_set(["web2"], lower=True))

    if length:
        words = [word for word in words if len(word) == length]

    if not words:
        print("No words found.")
        exit()

    return random.choice(words)


def hangman(max_penalties, word_length=None, word_file=None,
            theme=None, time_limit=None):

    word = choose_word(word_length, word_file, theme)
    hidden_word = ["_"] * len(word)
    penalties = 0
    start_time = time.time()

    while penalties < max_penalties:

        if time_limit:
            elapsed = time.time() - start_time

            if elapsed >= time_limit:
                print("Time's up!")
                print("You lose!")
                print("The word was:", word)
                return

        print(" ".join(hidden_word), "/", penalties, "penalty")

        if time_limit:
            remaining = int(time_limit - (time.time() - start_time))
            print("Time remaining:", remaining, "seconds")

        guess = input("$> ").lower()

        if time_limit and time.time() - start_time >= time_limit:
            print("Time's up!")
            print("You lose!")
            print("The word was:", word)
            return

        if len(guess) > 1:
            if guess == word:
                print(word + ": correct guess -", penalties, "penalties")
                return

            penalties += 5
            print(guess.upper() + ": incorrect guess")

        else:
            if guess in word:
                count = word.count(guess)
                print("Found", count, "'" + guess.upper() + "'")

                for i in range(len(word)):
                    if word[i] == guess:
                        hidden_word[i] = guess
            else:
                penalties += 1
                print("No '" + guess.upper() + "' found")

        if "_" not in hidden_word:
            print(word + ": correct guess -", penalties, "penalties")
            return

    print("You lose!")
    print("The word was:", word)


parser = argparse.ArgumentParser(description="Hangman")

parser.add_argument(
    "-p", "--penalties",
    type=int,
    default=12
)

parser.add_argument(
    "-l", "--length",
    type=int
)

parser.add_argument(
    "-f", "--file"
)

parser.add_argument(
    "-t", "--theme",
    choices=THEMES.keys()
)

parser.add_argument(
    "--time",
    type=int
)

args = parser.parse_args()

hangman(
    args.penalties,
    args.length,
    args.file,
    args.theme,
    args.time
)