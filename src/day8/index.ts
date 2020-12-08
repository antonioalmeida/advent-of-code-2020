import { readInput } from '../utils'

const deepClone = (arr) => {
    return JSON.parse(JSON.stringify(arr))
} 

const program = readInput('day8.in').map((entry) => { 
    const [op, arg] = entry.split(' ')
    return { op, arg: parseInt(arg)}
})

const map = {
    'nop': (arg, state) => state.index++,
    'acc': (arg, state) => { state.acc += arg; state.index++ },
    'jmp': (arg, state) => { state.index += arg }
}

export const part1 = () => {
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

export const part2 = () => {

    let finished = false

    const occurences = program.map(({op, arg}, index) => {
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
