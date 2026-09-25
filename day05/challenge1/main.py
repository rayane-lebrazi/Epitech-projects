import random
import time

start = time.time()

my_list = [random.randint(0, 1000000) for _ in range(1000000)]

my_list.sort()

print("Execution time:", time.time() - start, "seconds")