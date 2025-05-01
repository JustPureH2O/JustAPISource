import os

files = os.listdir(os.getcwd())
for file in files:
    path = os.path.join(os.getcwd(), file)
    if os.path.isfile(path) and (file.endswith('json') or file.endswith('webp')):
        print(file)
        if (not os.path.exists(file[:5])):
            os.mkdir(file[:5])
        os.rename(path, os.path.join(os.getcwd(), file[:5], file))
print('OVER')
