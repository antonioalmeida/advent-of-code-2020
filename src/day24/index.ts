import { parse } from 'yargs'
import { readInput } from '../utils'

export const part1 = () => {
    const directionsRegex = /(e|se|sw|w|nw|ne)/g
    const flips = readInput('day24.in').map((e) => e.match(directionsRegex))
    const colors: Set<string> = new Set()

    for (const f of flips) {
        let coord = [0, 0]
        f.map((e) => {
            switch (e) {
                case 'e':
                    coord[0] += 1
                    coord[1] += 0
                    break;
                case 'w':
                    coord[0] += -1
                    coord[1] += 0
                    break;
                case 'nw':
                    coord[0] -= (coord[1] % 2 === 0 ? 1 : 0)
                    coord[1] += 1
                    break;
                case 'sw':
                    coord[0] -= (coord[1] % 2 === 0 ? 1 : 0)
                    coord[1] -= 1
                    break;
                case 'ne':
                    coord[0] += (coord[1] % 2 !== 0 ? 1 : 0)
                    coord[1] += 1
                    break;
                case 'se':
                    coord[0] += (coord[1] % 2 !== 0 ? 1 : 0)
                    coord[1] -= 1
                    break
            }
        })


        if (colors.has(JSON.stringify(coord)))
            colors.delete(JSON.stringify(coord))
        else
            colors.add(JSON.stringify(coord))
    }

    return colors.size
}

const getNeighbors = (x, y) => {

    const directions = ['e', 'w', 'nw', 'sw', 'ne', 'se']
    const neighbors = []

    for (const d of directions) {
        let c = x
        let r = y

        switch (d) {
            case 'e':
                c += 1
                r += 0
                break;
            case 'w':
                c += -1
                r += 0
                break;
            case 'nw':
                c -= (r % 2 === 0 ? 1 : 0)
                r += 1
                break;
            case 'sw':
                c -= (r % 2 === 0 ? 1 : 0)
                r -= 1
                break;
            case 'ne':
                c += (r % 2 !== 0 ? 1 : 0)
                r += 1
                break;
            case 'se':
                c += (r % 2 !== 0 ? 1 : 0)
                r -= 1
                break
        }

        neighbors.push([c, r])
    }

    return neighbors
}

export const part2 = () => {
    const days: Map<number, number> = new Map()

    const directionsRegex = /(e|se|sw|w|nw|ne)/g
    const flips = readInput('day24.in').map((e) => e.match(directionsRegex))

    let blacks: Set<string> = new Set()
    let whites: Set<string> = new Set()

    for (let x = -100; x < 100; x++)
        for (let y = -100; y < 100; y++)
            whites.add(JSON.stringify([x,y]))

    for (const f of flips) {
        let coord = [0, 0]
        f.map((e) => {
            switch (e) {
                case 'e':
                    coord[0] += 1
                    coord[1] += 0
                    break;
                case 'w':
                    coord[0] += -1
                    coord[1] += 0
                    break;
                case 'nw':
                    coord[0] -= (coord[1] % 2 === 0 ? 1 : 0)
                    coord[1] += 1
                    break;
                case 'sw':
                    coord[0] -= (coord[1] % 2 === 0 ? 1 : 0)
                    coord[1] -= 1
                    break;
                case 'ne':
                    coord[0] += (coord[1] % 2 !== 0 ? 1 : 0)
                    coord[1] += 1
                    break;
                case 'se':
                    coord[0] += (coord[1] % 2 !== 0 ? 1 : 0)
                    coord[1] -= 1
                    break
            }
        })

        if (blacks.has(JSON.stringify(coord))) {
            blacks.delete(JSON.stringify(coord))
            whites.add(JSON.stringify(coord))
        }
        else {
            blacks.add(JSON.stringify(coord))
            whites.delete(JSON.stringify(coord))
        }
    }

    let day = 0
    while (day <= 100) {
        const blacksAdd = []; const blacksDel = [] 
        const whitesAdd = []; const whitesDel = []

        for (const c of blacks) {
            const [x,y] = JSON.parse(c)
            const neighbors = getNeighbors(x,y)

            // @ts-ignore
            const nBlack:number = neighbors.map((e) => blacks.has(JSON.stringify(e))).reduce((a,b) => a+b)

            if (nBlack === 0 || nBlack > 2) {
                whitesAdd.push(c)
                blacksDel.push(c)
            }
        }

        for (const c of whites) {
            const [x,y] = JSON.parse(c)
            const neighbors = getNeighbors(x,y)

            // @ts-ignore
            const nBlack:number = neighbors.map((e) => blacks.has(JSON.stringify(e))).reduce((a,b) => a+b)

            if (nBlack === 2) {
                whitesDel.push(c)
                blacksAdd.push(c)
            }
        }

        days.set(day, blacks.size)

        blacksAdd.map((e) => blacks.add(e))
        blacksDel.map((e) => blacks.delete(e))

        whitesAdd.map((e) => whites.add(e))
        whitesDel.map((e) => whites.delete(e))

        day++
    }

    return days.get(100)
}