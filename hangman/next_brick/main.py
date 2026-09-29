import random


def random_number():
    numbers = {1, 2, 3, 4, 5, 6}
    return random.choice(list(numbers))


print(random_number())