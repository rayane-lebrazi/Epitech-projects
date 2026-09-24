number = int(input("Give me an integer: "))

if number == 42:
    print("a", end="")

if number <= 21:
    print("b", end="")

if number % 2 == 0:
    print("c", end="")

if number / 2 < 21:
    print("d", end="")

if number % 2 != 0 and number >= 45:
    print("e", end="")

if not (number == 42 or number <= 21 or number % 2 == 0 or number / 2 < 21 or (number % 2 != 0 and number >= 45)):
    print("f", end="")