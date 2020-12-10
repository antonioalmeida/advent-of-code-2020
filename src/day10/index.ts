import { readInput } from '../utils'

export const part1 = () => {
    const adapters = readInput('day10.in').map((entry) => Number(entry))
    adapters.sort((a,b) => a-b)

    let nDiff1 = 0
    let nDiff3 = 0

    let currentJolt = 0

    for (const adapter of adapters) {
        const diff = adapter - currentJolt
        if (diff == 1) 
            nDiff1++
        if (diff == 3)
            nDiff3++

        currentJolt += diff
    }

    nDiff3++ // built-in adapter

    return { nDiff1, nDiff3, res: nDiff1*nDiff3}
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}