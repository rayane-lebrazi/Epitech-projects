number, string = input("Give me an integer and a string: ").split()

number = int(number)

if number == 0:
    quit()
elif any(vowel in string.lower() for vowel in "aeiou") or number >= 42:
    print(number)
else:
    print(string)