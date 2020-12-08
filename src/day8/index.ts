const fs = require('fs')

const deepClone = (arr) => {
    return JSON.parse(JSON.stringify(arr))
} 

const program = fs.readFileSync('input.txt').toString().split("\n").map((entry) => { 
    const [op, arg] = entry.split(' ')
    return { op, arg: parseInt(arg)}
})

const map = {
    'nop': (_, state) => state.index++,
    'acc': (arg, state) => { state.acc += arg; state.index++ },
    'jmp': (arg, state) => { state.index += arg }
}

const part1 = () => {
    const executed = {}

    const state = {
        index: 0,
        acc: 0
    }

    while(!executed[state.index]) {
        const { op, arg } = program[state.index]
        executed[state.index] = true
        map[op](arg, state)
    }

    return state
}

const part2 = () => {

    let finished = false

    const occurences = program.map(({op, _}, index) => {
        if (op == 'nop' || op == 'jmp')
            return index
    }).filter((elem) => elem)

    while (!finished) {
        const input = deepClone(program)

        const indexToReplace = occurences.shift()
        const toReplace = input[indexToReplace]
        input[indexToReplace].op = toReplace == 'nop' ? 'jmp' : 'nop'

        const state = { index: 0, acc: 0 }
        const executed = {}
        while(!executed[state.index] && !finished) {
            const { op, arg } = input[state.index]
            executed[state.index] = true
            map[op](arg, state)

            if(state.index == input.length) {
                finished = true
                return state
            }
        }
    }
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())

