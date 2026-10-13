message = input("Give me the encrypted text: ")

for key in range(26):
    result = ""

    for letter in message:
        if letter.isalpha():
            if letter.islower():
                result += chr((ord(letter) - ord('a') - key) % 26 + ord('a'))
            else:
                result += chr((ord(letter) - ord('A') - key) % 26 + ord('A'))
        else:
            result += letter

    print("Key", key, ":", result)