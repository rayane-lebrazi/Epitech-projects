def kitchen(vegetarian=False):

    
    if vegetarian:
        print("<//////////>")
        print("~~~~~~~~~~~~")
        print("~~~~~~~~~~~~")
        print("O O O O O O")
        print("O O O O O O")
        print("<//////////>")
    else:
        print("<//////////>")
        print("~~~~~~~~~~~~")
        print("O O O O O O")
        print("============")
        print("============")
        print("<//////////>")

veg = input("do you want a veg sandwich (y/n)")
option = False
if veg == 'y':
    option = True

kitchen(option)
