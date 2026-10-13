def get_content(filename):
    with open(filename, "r", encoding="utf-8") as file:
        content = file.read()

    if content.strip() == "":
        raise ValueError("Le fichier est vide.")

    return content



def read_file():
    try:
        content = get_content("primes.txt")
        print(content, end="")

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


read_file()
