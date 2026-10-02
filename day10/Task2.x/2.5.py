def create_file():
    try:
        with open("toto.txt", "x", encoding="utf-8"):
            pass

        print("Fichier créé.")

    except OSError as error:
        print("Erreur :", error)


create_file()
