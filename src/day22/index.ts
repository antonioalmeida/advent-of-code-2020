import { readInput } from '../utils'

export const part1 = () => {
    const [p1Raw, p2Raw] = readInput('day22.in', '\n\n')

    const player1 = p1Raw.split('\n').slice(1).map((e) => parseInt(e))
    const player2 = p2Raw.split('\n').slice(1).map((e) => parseInt(e))

    while(player1.length > 0 && player2.length > 0) {
        const p1 = player1.shift(); const p2 = player2.shift()

        if (p1 > p2) player1.push(p1,p2)
        else if (p2 > p1) player2.push(p2, p1)
        else {
            player1.push(p1)
            player2.push(p2)
        }
    }

    const winner = player1.length > 0 ? player1 : player2
    return winner.reverse().map((c, i) => c*(i+1) ).reduce((a,b) => a+b)
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}