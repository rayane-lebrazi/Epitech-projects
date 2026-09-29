import random
from english_words import get_english_words_set


def hide_word(word):
    return "_ " * len(word)


def check_penalties(penalties):
    if penalties >= 12:
        print("You lose!")
        return True
    return False


def choose_word():
    words = get_english_words_set(['web2'], lower=True)
    return random.choice(list(words))


def hangman():
    word = choose_word()
    hidden_word = ["_"] * len(word)
    penalties = 0

    while penalties < 12:

        print(" ".join(hidden_word), "/", penalties, "penalty")

        guess = input("$> ").lower()

        # Complete word guess
        if len(guess) > 1:

            if guess == word:
                print(word + ": correct guess -", penalties, "penalties")
                return

            penalties += 5
            print(guess.upper() + ": incorrect guess")

        # Single letter guess
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

        # Check if the whole word has been discovered
        if "_" not in hidden_word:
            print(word + ": correct guess -", penalties, "penalties")
            return

    print("You lose!")
    print("the word was :", word)


hangman()