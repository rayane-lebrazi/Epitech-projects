def write():
    try:
        with open("toto.txt", "r+", encoding="utf-8") as file:
            content = file.read()

            if content != "" and not content.endswith("\n"):
                file.write("\n")

            file.write("I'm a new line\n")

    except (OSError, UnicodeError) as error:
        print("Erreur :", error)


write()
