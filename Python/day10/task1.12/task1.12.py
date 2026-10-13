def new_division(num, den, acc=1):
    if not isinstance(num, (int, float)) or not isinstance(den, (int, float)):
        raise ValueError()

    if not isinstance(acc, int) or acc < 0:
        raise ValueError()

    if den == 0:
        raise ValueError()

    print(round(num / den, acc))


new_division(8.4, 13)
new_division(8.4, 13, 6)
