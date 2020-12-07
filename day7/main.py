import re

def read_input(filename):
    file = open(filename, "r").read().strip()
    lines = re.split("\n", file)

    bags = {}
    for line in lines:
        split = re.split(" ", line)
        name = f'{split[0]} {split[1]}'
        rest = split[4:]
        contains = []
        for i in range(0, len(rest), 4):
            if rest[i] != 'no':
                contains += [(f'{rest[i+1]} {rest[i+2]}', int(rest[i]))]
        bags[name] = contains

    return bags

def part1():
    bags = read_input('input.txt')
    res = {}

    def search_aux(x):
        bag = x[0]; n = x[1]

        if bag == 'shiny gold': return 1
        elif len(bags[bag]) == 0: return 0
        else: return n*sum(map(search_aux, bags[bag]))

    for bag, content in bags.items():
        res[bag] = sum([search_aux(b) for b in content])

    return sum([bool(x) for x in res.values()])
        
def part2():
    bags = read_input('input.txt')

    def search_aux(x):
        bag = x[0]; n = x[1]
        if len(bags[bag]) == 0: return n
        else: 
            return n*sum(map(search_aux, bags[bag]))+n

    # minus 1 because it's "inside shiny gold"
    return search_aux(('shiny gold', 1) - 1) 

print("Part 1:", part1())
print("Part 2:", part2())