import os

def list_directory(path):
    for item in os.listdir(path):
        full_path = os.path.join(path, item)

        print(full_path)

        if os.path.isdir(full_path):
            list_directory(full_path)


list_directory(".")