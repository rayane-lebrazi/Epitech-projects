import random
import argparse
import time
from datetime import date
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
        try:
            with open(word_file, "r") as file:
                words = []

                for line in file:
                    word = line.strip().lower()

                    if word.isalpha():
                        words.append(word)

        except FileNotFoundError:
            print("Error: file not found")
            exit()

    else:
        words = list(get_english_words_set(["web2"], lower=True))

    if length:
        words = [word for word in words if len(word) == length]

    if not words:
        print("No words found.")
        exit()

    return random.choice(words)


def get_highscore():
    with open("highscore.txt", "r") as file:
        line = file.read().strip()

    parts = line.split()

    return int(parts[0]), parts[1]


def save_highscore(attempts):
    today = date.today().strftime("%Y-%m-%d")

    with open("highscore.txt", "w") as file:
        file.write(str(attempts) + " " + today)

    return today


def hangman(max_penalties, word_length=None, word_file=None,
            theme=None, time_limit=None):

    word = choose_word(word_length, word_file, theme)
    hidden_word = ["_"] * len(word)
    penalties = 0
    attempts = 0
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
        attempts += 1

        if time_limit and time.time() - start_time >= time_limit:
            print("Time's up!")
            print("You lose!")
            print("The word was:", word)
            return

        if len(guess) > 1:
            if guess == word:
                highscore, highscore_date = get_highscore()

                if attempts < highscore:
                    new_date = save_highscore(attempts)

                    print(
                        "Best ever! You guessed '" +
                        word +
                        "' in " +
                        str(attempts) +
                        " attempts."
                    )
                    print("New high score date:", new_date)

                else:
                    print(
                        "You guessed '" +
                        word +
                        "' in " +
                        str(attempts) +
                        " attempts."
                    )
                    print(
                        "High score:",
                        highscore,
                        "attempts on",
                        highscore_date
                    )

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
            highscore, highscore_date = get_highscore()

            if attempts < highscore:
                new_date = save_highscore(attempts)

                print(
                    "Best ever! You guessed '" +
                    word +
                    "' in " +
                    str(attempts) +
                    " attempts."
                )
                print("New high score date:", new_date)

            else:
                print(
                    "You guessed '" +
                    word +
                    "' in " +
                    str(attempts) +
                    " attempts."
                )
                print(
                    "High score:",
                    highscore,
                    "attempts on",
                    highscore_date
                )

            return

    print("You lose!")
    print("The word was:", word)


parser = argparse.ArgumentParser(description="Hangman")

parser.add_argument(
    "word_file",
    help="file containing words"
)

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
    args.word_file,
    args.theme,
    args.time
)