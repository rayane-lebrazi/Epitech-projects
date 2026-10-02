def my_sum(*args):
    total = 0

    for value in args:
        if not isinstance(value, (int, float)):
            raise ValueError()

        total += value

    return total


print(my_sum(1))
print(my_sum(1, 2, 3))
print(my_sum(-20, -10, 5, 5, 10, 10))

try:
    print(my_sum(1, "toto"))
except ValueError:
    print("ValueError")
