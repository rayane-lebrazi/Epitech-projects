def kitchen(x):

    print("<//////////>")
    print("~~~~~~~~~~~~")
    print("O O O O O O")
    print("============")
    print("============")
    print("<//////////>")


number = input("How many sandwiches do you want? ")

if not number.isdigit() or int(number) <= 0:
    print("I can't do this!")
else:
    number = int(number)

    for i in range(number):
        print("sandwich number",i)
        kitchen(number)
