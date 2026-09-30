import turtle

t = turtle.Turtle()

length = 10

for i in range(100):
    t.forward(length)
    t.right(10)
    length += 1

turtle.done()