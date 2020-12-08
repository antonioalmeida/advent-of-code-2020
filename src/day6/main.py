import re

def part1():
    file = open("input1.txt", "r").read().strip()
    return sum([len(set(line.replace("\n", ""))) for line in re.split("\n\n", file)])

def part2():
    file = open("input1.txt", "r").read().strip()
    return sum(
        len(set.intersection(*map(set, line.split("\n"))))
        for line in re.split("\n\n", file)
    )

print("Part 1:", part1())
print("Part 2:", part2())