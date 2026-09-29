from english_words import get_english_words_set
import random

words = get_english_words_set(['web2'], lower=True)

word = random.choice(list(words))

print(word)