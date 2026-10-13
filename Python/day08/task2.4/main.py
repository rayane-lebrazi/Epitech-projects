import turtle

t = turtle.Turtle()

length = 5

for i in range(100):
    t.forward(length)
    t.right(30)
    length += 1

turtle.done()