import { readInput } from '../utils'

const operations = readInput('day14.in').map((entry) => {
    let mask: string
    let arg: string
    let position: number

    if (/^mask/.test(entry))
        mask = entry.split('=')[1].trim()
    else {
        const split = entry.split('=')
        position = parseInt(split[0].match(/^mem\[(\d+)\]/)[1])
        arg = parseInt(split[1]).toString(2).padStart(36, '0') // str -> int -> binary
    }
    return { mask, arg, position }
})

export const part1 = () => {
    const memory = {}
    let activeMask: string
    for (const op of operations) {
        if (op.mask) {
            activeMask = op.mask
            continue
        }

        const value = op.arg.split('').map((bit, index) => activeMask[index] == 'X' ? bit : activeMask[index]).join('')
        memory[op.position] = parseInt(value, 2)
    }

    // @ts-ignore
    return Object.values(memory).reduce((a, b) => a + b)
}

export const part2 = () => {
    const memory = {}
    let activeMask: string
    for (const op of operations) {
        if (op.mask) {
            activeMask = op.mask
            continue
        }

        const address = op.position.toString(2).padStart(36, '0').split('')
            .map((bit, index) => activeMask[index] == 'X' ? 'X' : activeMask[index] == '1' ? '1' : bit).join('')
        getCombinations(address).map((addr) => memory[addr] = parseInt(op.arg, 2))
    }

    // @ts-ignore
    return Object.values(memory).reduce((a, b) => a + b)
}

const getCombinations = (str: string) => {
    const queue = [str]
    const res = []

    while (queue.length > 0) {
        const curr = queue.shift()
        const pair = getCombinationsAux(curr)

        if (pair.length == 1)
            res.push(...pair)
        else
            queue.push(...pair)
    }

    return res
}

const getCombinationsAux = (str: string) => {
    if (str.indexOf('X') < 0)
        return [str]

    const xIndex = str.indexOf('X')
    const ones = str.slice(0, xIndex) + '1' + str.slice(xIndex + 1)
    const zeros = str.slice(0, xIndex) + '0' + str.slice(xIndex + 1)
    return [ones, zeros]
}