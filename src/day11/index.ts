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
    let layout = readInput('day11.in').map((entry) => entry.split(''))

    let stateChanged = true
    while (stateChanged) {
        stateChanged = false

        let newLayout = []
        for (let [y, line] of layout.entries()) {

            newLayout.push([])
            for (let [x, col] of line.entries()) {
                let newState = col
                const adjacentCells = adjacentPositions
                        .map(([j, i]) => {
                            if (!layout[j+y]) return false
                            let cell = layout[j+y][i+x]

                            let newJ = j; let newI = i
                            while(cell == '.') {
                                newJ+=j; newI+=i
                                cell = layout[newJ+y] ? layout[newJ+y][newI+x] : ''
                            }

                            return cell
                        })
                        .filter((x) => x)

                // @ts-ignore
                const nOccupied: number = adjacentCells.map((cell) => cell == '#').reduce((a, b) => a + b)

                switch (col) {
                    case ('L'):
                        if (nOccupied == 0)
                            newState = '#'
                        break
                    case ('#'):
                        if (nOccupied >= 5)
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