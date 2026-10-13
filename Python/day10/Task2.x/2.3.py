def read_lines(*numbers):
    try:
        content = get_content("primes.txt")
        lines = content.splitlines()

        for number in numbers:
            if type(number) is not int:
                print("The numbers are supposde to be int.")
                return

            if number < 1 or number > len(lines):
                print("the line ", number, "doesnt exist.")
                return

        for number in numbers:
            print(lines[number - 1])

    except (OSError, UnicodeError, ValueError) as error:
        print("Erreur :", error)


read_lines(1, 666)
