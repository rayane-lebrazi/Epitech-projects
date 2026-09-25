list = [67, 58, 10, 78, -120]
min = list[0]
max = list[0]
for i in range(len(list)):
    if list[i] >= max:
        max = list[i]
    if list[i] <= min:
        min = list[i]


print("The smallest number is",min)
print("The biggest number is",max)