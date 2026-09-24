message = input("Give me a text: ")
key = input("Give me the key: ")
choice = input("Encrypt or decrypt? (choose e or d): ")

result = ""
key_position = 0

for letter in message:

    if letter.isalpha():

        shift = ord(key[key_position % len(key)].lower()) - ord('a')

        if choice == "d":
            shift = -shift

        if letter.islower():
            result += chr((ord(letter) - ord('a') + shift) % 26 + ord('a'))
        else:
            result += chr((ord(letter) - ord('A') + shift) % 26 + ord('A'))

        key_position += 1

    else:
        result += letter

print("Result:", result)