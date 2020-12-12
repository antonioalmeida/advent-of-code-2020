import { readInput } from '../utils'

const adjacentPositions = [
    [-1, -1], [0, -1], [+1, -1],
    [-1, 0],           [+1, 0],
    [-1, +1], [0, +1], [+1, +1]
]

export const part1 = () => {
    let layout = readInput('day11.in').map((entry) => entry.split(''))

    let stateChanged = true
    while (stateChanged) {
        stateChanged = false

        let newLayout = []
        for (let [y, line] of layout.entries()) {

            newLayout.push([])
            for (let [x, col] of line.entries()) {
                let newState = col
                const adjacentCells = adjacentPositions.map(([j, i]) => layout[j + y] ? layout[j + y][i + x] || '' : '').filter((x) => x)

                // @ts-ignore
                const nOccupied: number = adjacentCells.map((cell) => cell == '#').reduce((a, b) => a + b)

                switch (col) {
                    case ('L'):
                        if (nOccupied == 0)
                            newState = '#'
                        break
                    case ('#'):
                        if (nOccupied >= 4)
                            newState = 'L'
                        break
                }

                newLayout[y].push(newState)
                if (newState != col)
                    stateChanged = true
            }
        }

        layout = newLayout
    }

    // @ts-ignore
    return  layout.flat().map((cell) => cell == '#').reduce((a, b) => a + b)
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}