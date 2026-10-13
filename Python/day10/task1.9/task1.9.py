def my_division(a, b):
    if not isinstance(a, int) or not isinstance(b, int):
        raise ValueError()

    if b == 0:
        raise ValueError()

    return a // b, a % b


try:
    quotient, remainder = my_division(42, 4)
    print(quotient)
    print(remainder)
except ValueError:
    print("ValueError")
