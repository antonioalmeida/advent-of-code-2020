import { argv } from 'process'
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
    console.log('Done in Python. Needs rewrite.')
}