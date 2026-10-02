def read_lines(*numbers):
    try:
        content = get_content("primes.txt")
        lines = content.splitlines()

        for number in numbers:
            if type(number) is not int:
                print("Erreur : les numéros doivent être des entiers.")
                return

            if number < 1 or number > len(lines):
                print("Erreur : la ligne", number, "n'existe pas.")
                return

        for number in numbers:
            print(lines[number - 1])

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


read_lines(1, 666)
