def rewrite():
    try:
        content = get_content("zen.txt")

        with open("toto.txt", "w", encoding="utf-8") as file:
            file.write(content)

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


rewrite()
