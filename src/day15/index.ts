import { number } from 'yargs'
import { readInput } from '../utils'

export const part1 = () => {
    const numbers = readInput('day15.in')[0].split(',').map((e) => parseInt(e))

    const occurences = {}
    let turn = numbers.length + 1

    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i]
        occurences[n] = [i+1]
    }

    console.log('occorences', occurences)
    console.log('numbers', numbers)

    let previous = numbers.pop()
    while(turn <= 30000000) {
        // console.log(turn)
        const prev = occurences[previous]

        if (prev.length == 1) {
            const occur0 = occurences[0]
            occur0 ? occurences[0].push(turn) : occurences[0] = [turn]
            // console.log(`turn, ${turn}, previous ${previous}, spoken ${0}`)
            previous = 0
            if (occur0.length > 2) occurences[0].shift()
        } 
        else {
            //const next =    Math.abs(occurences[previous].reduce((a,b) => a-b))
            const next = occurences[previous][1] - occurences[previous][0]
            occurences[next] ? occurences[next].push(turn) : occurences[next] = [turn]
            // console.log(`turn, ${turn}, previous ${previous}, spoken ${next}`)
            if (occurences[next].length > 2) occurences[next].shift()
            previous = next
        }

        turn++
    }

    console.log(numbers.length)
    return previous
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}