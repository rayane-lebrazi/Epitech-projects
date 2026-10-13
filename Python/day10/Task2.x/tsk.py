def longest():
    try:
        words = get_words()
        longest_word = ""

        for word in words:
            if len(word) > len(longest_word):
                longest_word = word

        if longest_word == "":
            print("Erreur : aucun mot.")
        else:
            print(longest_word)

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


longest()
