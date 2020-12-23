import { readInput } from '../utils'

export const part1 = () => {
    const [p1Raw, p2Raw] = readInput('day22.in', '\n\n')

    const player1 = p1Raw.split('\n').slice(1).map((e) => parseInt(e))
    const player2 = p2Raw.split('\n').slice(1).map((e) => parseInt(e))

    while (player1.length > 0 && player2.length > 0) {
        const p1 = player1.shift(); const p2 = player2.shift()

        if (p1 > p2) player1.push(p1, p2)
        else if (p2 > p1) player2.push(p2, p1)
        else {
            player1.push(p1)
            player2.push(p2)
        }
    }

    const winner = player1.length > 0 ? player1 : player2
    return winner.reverse().map((c, i) => c * (i + 1)).reduce((a, b) => a + b)
}

export const part2 = () => {
    const [p1Raw, p2Raw] = readInput('day22.in', '\n\n')

    const player1 = p1Raw.split('\n').slice(1).map((e) => parseInt(e))
    const player2 = p2Raw.split('\n').slice(1).map((e) => parseInt(e))

    const res = playGame(player1, player2)
    const winner = player1.length > 0 ? player1 : player2
    return winner.reverse().map((c, i) => c * (i + 1)).reduce((a, b) => a + b)
}

const playGame = (player1: Array<number>, player2: Array<number>) => {
    const played: Set<string> = new Set()

    while (player1.length > 0 && player2.length > 0) {
        if (played.has(JSON.stringify([player1, player2]))) return true
        played.add(JSON.stringify([player1, player2]))

        const p1 = player1.shift();
        const p2 = player2.shift()

        const e1 = player1.length >= p1
        const e2 = player2.length >= p2

        if (e1 && e2) { // recursive game
            const subPlayer1 = player1.slice(0, p1)
            const subPlayer2 = player2.slice(0, p2)

            if (playGame(subPlayer1, subPlayer2)) player1.push(p1, p2)
            else player2.push(p2, p1)
        }
        else { // regular round
            if (p1 > p2) player1.push(p1, p2)
            else if (p2 > p1) player2.push(p2, p1)
            else {
                player1.push(p1)
                player2.push(p2)
            }
        }
    }

    return player1.length > 0
}