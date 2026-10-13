def check_even(number):
    return number % 2 == 0

numbers = [1, 2, 3, 4, 5, 6]

print(list(filter(check_even, numbers)))
