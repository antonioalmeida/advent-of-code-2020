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

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}