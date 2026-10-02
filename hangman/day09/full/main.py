import os 
os.environ['SDL_AUDIODRIVER'] = 'dummy'

import pygame
import random
import argparse
import time
from datetime import date


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


def choose_word(word_file, length=None, theme=None):
    if theme:
        words = THEMES[theme]
    else:
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

    if length:
        words = [word for word in words if len(word) == length]

    if not words:
        print("No words found.")
        exit()

    return random.choice(words)


def get_highscore():
    try:
        with open("highscore.txt", "r") as file:
            line = file.read().strip()

        parts = line.split()

        if len(parts) >= 2:
            return int(parts[0]), parts[1]

        return 999, "never"

    except (FileNotFoundError, ValueError):
        return 999, "never"


def save_highscore(attempts):
    today = date.today().strftime("%Y-%m-%d")

    with open("highscore.txt", "w") as file:
        file.write(str(attempts) + " " + today)

    return today


def draw_stickman(screen, penalties):
    pygame.draw.line(
        screen, "black", (150, 500), (150, 150), 8
    )

    pygame.draw.line(
        screen, "black", (150, 150), (350, 150), 8
    )

    pygame.draw.line(
        screen, "black", (350, 150), (350, 200), 8
    )

    if penalties >= 1:
        pygame.draw.circle(
            screen, "black", (350, 240), 40, 6
        )

    if penalties >= 2:
        pygame.draw.line(
            screen, "black", (350, 280), (350, 400), 8
        )

    if penalties >= 3:
        pygame.draw.line(
            screen, "black", (350, 310), (300, 360), 8
        )

    if penalties >= 4:
        pygame.draw.line(
            screen, "black", (350, 310), (400, 360), 8
        )

    if penalties >= 5:
        pygame.draw.line(
            screen, "black", (350, 400), (300, 470), 8
        )

    if penalties >= 6:
        pygame.draw.line(
            screen, "black", (350, 400), (400, 470), 8
        )


class Hangman:

    def __init__(
        self,
        word_file,
        length=None,
        theme=None,
        max_penalties=6,
        time_limit=None
    ):
        pygame.init()
        print("1 - pygame started")

        self.screen = pygame.display.set_mode((900, 700))
        pygame.display.set_caption("Hangman")

        self.background = pygame.image.load("background.jpg")
        self.background = pygame.transform.scale(
            self.background, (900, 700)
        )

        print("2 - background loaded")

        self.font = pygame.font.SysFont("Arial", 28)
        self.small_font = pygame.font.SysFont("Arial", 20)
        self.big_font = pygame.font.SysFont("Arial", 40, bold=True)

        self.word_file = word_file
        self.length = length
        self.theme = theme
        self.max_penalties = max_penalties
        self.time_limit = time_limit

        self.score = 0

        self.new_game()

        print("3 - game created")

    def new_game(self):
        self.word = choose_word(
            self.word_file,
            self.length,
            self.theme
        )

        print("Selected word:", self.word)

        self.hidden_word = ["_"] * len(self.word)
        self.used_letters = set()

        self.penalties = 0
        self.attempts = 0

        self.start_time = time.time()

        self.game_over = False
        self.result = ""

    def draw_text(self, text, x, y, font=None):
        if font is None:
            font = self.font

        image = font.render(text, True, "black")
        self.screen.blit(image, (x, y))

    def draw_letters(self):
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        for i, letter in enumerate(alphabet):
            if letter.lower() in self.used_letters:
                continue

            x = 500 + (i % 7) * 55
            y = 250 + (i // 7) * 55

            pygame.draw.rect(
                self.screen,
                "white",
                (x, y, 45, 40)
            )

            pygame.draw.rect(
                self.screen,
                "black",
                (x, y, 45, 40),
                2
            )

            image = self.small_font.render(
                letter,
                True,
                "black"
            )

            self.screen.blit(
                image,
                (x + 14, y + 8)
            )

    def guess_letter(self, letter):
        if self.game_over:
            return

        if letter in self.used_letters:
            return

        self.used_letters.add(letter)
        self.attempts += 1

        if letter in self.word:
            for i in range(len(self.word)):
                if self.word[i] == letter:
                    self.hidden_word[i] = letter

            self.score += 10

        else:
            self.penalties += 1
            self.score = max(0, self.score - 2)

        if "_" not in self.hidden_word:
            self.win()

        elif self.penalties >= self.max_penalties:
            self.lose()

    def win(self):
        self.game_over = True

        highscore, highscore_date = get_highscore()

        if self.attempts < highscore:
            save_highscore(self.attempts)

            self.result = (
                "NEW HIGH SCORE! "
                + str(self.attempts)
                + " attempts"
            )
        else:
            self.result = (
                "YOU WIN! "
                + str(self.attempts)
                + " attempts"
            )

    def lose(self):
        self.game_over = True
        self.result = "YOU LOSE! Word: " + self.word

    def draw(self):
        self.screen.blit(self.background, (0, 0))

        draw_stickman(
            self.screen,
            self.penalties
        )

        word = " ".join(self.hidden_word)

        self.draw_text(
            word,
            500,
            100,
            self.big_font
        )

        self.draw_text(
            "Penalties: "
            + str(self.penalties)
            + "/"
            + str(self.max_penalties),
            500,
            160
        )

        self.draw_text(
            "Attempts: " + str(self.attempts),
            500,
            195
        )

        self.draw_text(
            "Score: " + str(self.score),
            500,
            230
        )

        if self.time_limit:
            remaining = max(
                0,
                int(
                    self.time_limit
                    - (time.time() - self.start_time)
                )
            )

            self.draw_text(
                "Time: " + str(remaining) + "s",
                700,
                20,
                self.small_font
            )

        self.draw_letters()

        if self.game_over:
            pygame.draw.rect(
                self.screen,
                "white",
                (180, 540, 540, 100)
            )

            pygame.draw.rect(
                self.screen,
                "black",
                (180, 540, 540, 100),
                3
            )

            self.draw_text(
                self.result,
                210,
                555,
                self.small_font
            )

            self.draw_text(
                "Press R to play again",
                300,
                590,
                self.small_font
            )

    def run(self):
        running = True
        clock = pygame.time.Clock()

        print("4 - game loop started")

        while running:

            for event in pygame.event.get():

                if event.type == pygame.QUIT:
                    running = False

                if event.type == pygame.KEYDOWN:

                    if event.key == pygame.K_r and self.game_over:
                        self.new_game()

                    elif event.key == pygame.K_ESCAPE:
                        running = False

                    elif event.unicode.isalpha():
                        self.guess_letter(
                            event.unicode.lower()
                        )

            if self.time_limit and not self.game_over:

                elapsed = time.time() - self.start_time

                if elapsed >= self.time_limit:
                    self.lose()

            self.draw()

            pygame.display.flip()

            clock.tick(60)

        pygame.quit()


def main():

    parser = argparse.ArgumentParser(
        description="Graphical Hangman"
    )

    parser.add_argument(
        "word_file",
        help="file containing words"
    )

    parser.add_argument(
        "-p",
        "--penalties",
        type=int,
        default=6
    )

    parser.add_argument(
        "-l",
        "--length",
        type=int
    )

    parser.add_argument(
        "-t",
        "--theme",
        choices=THEMES.keys()
    )

    parser.add_argument(
        "--time",
        type=int
    )

    args = parser.parse_args()

    game = Hangman(
        args.word_file,
        args.length,
        args.theme,
        args.penalties,
        args.time
    )

    game.run()


if __name__ == "__main__":
    main()