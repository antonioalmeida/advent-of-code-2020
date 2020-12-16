import { readInput } from '../utils'

const numbers = readInput('day15.in')[0].split(',').map((e) => parseInt(e))

const countTurns = (stopTurn) => {

    const occurences = new Map()
    let turn = numbers.length + 1

    for (const [i,n] of numbers.entries()) 
        occurences.set(n, [i+1])

    let previous = numbers.pop()
    while (turn <= stopTurn) {
        const prev = occurences.get(previous)
        const next = prev.length == 1 ? 0 : prev[1] - prev[0]

        const toSpeak = occurences.get(next)
        toSpeak ? toSpeak.push(turn) : occurences.set(next, [turn])
        if (occurences.get(next).length > 2) toSpeak.shift()

        previous = next
        turn++
    }

    return previous
}

export const part1 = () => {
    return countTurns(2020)
}

export const part2 = () => {
    return countTurns(30000000)
}