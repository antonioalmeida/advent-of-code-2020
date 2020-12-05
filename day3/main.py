fhand = open('input1.txt')

floor = []
for line in fhand:
    line = (line.rstrip()) * 1000
    floor.append(line)

fhand.close()

slopes = [(1,1), (3,1), (1,2), (7,1), (5,1)]

for (x,y) in slopes:
    route = { '.': 0, '#': 0 }
    i = 0
    for y in range(0,len(floor), y):
        char = floor[y][i]
        route[char] += 1
        i += x

    print(route)
