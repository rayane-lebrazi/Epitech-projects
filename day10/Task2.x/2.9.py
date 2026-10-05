from tsk import longest
longest
def get_words():
    with open("zen.txt", "r", encoding="utf-8") as file:
        content = file.read().lower()
 
    clean_text = ""
 
    for character in content:
        if character.isalpha() or character == "'":
            clean_text += character
        else:
            clean_text += " "
 
    return clean_text.split()
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
