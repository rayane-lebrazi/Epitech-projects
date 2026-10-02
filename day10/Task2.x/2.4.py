def count_lines(filename):
    try:
        content = get_content(filename)
        lines = content.splitlines()

        print(len(lines))

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


count_lines("zen.txt")
count_lines("primes.txt")
