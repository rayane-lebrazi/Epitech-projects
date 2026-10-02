def word_frequency():
    try:
        words = get_words()

        if len(words) == 0:
            print("Erreur : aucun mot.")
            return

        counts = {}

        for word in words:
            if word in counts:
                counts[word] += 1
            else:
                counts[word] = 1

        for word in counts:
            print(word, ":", counts[word])

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


word_frequency()
