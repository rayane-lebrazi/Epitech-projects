def my_count(stop, start=0, step=1):
    if not isinstance(stop, int) or not isinstance(start, int) or not isinstance(step, int):
        raise ValueError()

    if step == 0:
        raise ValueError()

    if start < stop and step < 0:
        step = -step
    elif start > stop and step > 0:
        step = -step

    number = start

    while (step > 0 and number <= stop) or (step < 0 and number >= stop):
        print(number)
        number += step


my_count(100, -100, 42)
my_count(-100, 100, -42)
