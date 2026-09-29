import time

def power(number, exponent):
    result = 1

    while exponent > 0:
        if exponent % 2 == 1:
            result = result * number

        number = number * number
        exponent = exponent // 2

    return result


start = time.time()
print(power(2, 3))
end = time.time()

print("Time for 4^284:", end - start, "seconds")


start = time.time()
print(power(42, 168))
end = time.time()

print("Time for 4^2168:", end - start, "seconds")