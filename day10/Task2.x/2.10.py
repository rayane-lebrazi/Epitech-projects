def letter_frequency():
    try:
        content = get_content("zen.txt").lower()

        counts = {}

        for letter in content:
            if letter.isalpha():
                if letter in counts:
                    counts[letter] += 1
                else:
                    counts[letter] = 1

        if len(counts) == 0:
            print("Erreur : aucune lettre.")
            return

        for letter in counts:
            print(letter, ":", counts[letter])

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


letter_frequency()	
