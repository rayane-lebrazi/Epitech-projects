import turtle

def draw_polygon(sides):
    angle = 360 / sides

    for i in range(sides):
        turtle.forward(100)
        turtle.right(angle)

side = int(input("Give me how many sides you want"))
draw_polygon(side)

turtle.done()