animalsCounts = [['cat', 666], ['dog', 3], ['elephant', 42]]

sortedAnimals = sorted(animalsCounts, key=lambda animal: animal[1])

print(sortedAnimals)