def read_line():
    try:
        empty = True

        with open("zen.txt", "r", encoding="utf-8") as file:
            for line in file:
                print(line, end="")

                if line.strip() != "":
                    empty = False

        if empty:
            print("Erreur : le fichier est vide.")

    except (OSError, UnicodeError) as error:
        print("Erreur :", error)


read_line()
