import { readInput, reverse } from '../utils'

export const part1 = () => {
    const rawTiles = readInput('day20.in', '\n\n')

    const tiles: Map<number, { layout, top, bot, left, right, edges }> = new Map()
    rawTiles.map((tile) => {
        const [indexLine, ...rest] = tile.split('\n')

        const index = parseInt(indexLine.slice(5, 9))
        const layout = rest

        const top = layout[0]
        const bot = layout[layout.length - 1]
        const left = layout.map((e) => e[0]).join('')
        const right = layout.map((e) => e[e.length - 1]).join('')
        const edges = [top, bot, left, right]

        tiles.set(index, { layout, edges, top, bot, left, right })
    })

    const unique:Map<number, number> = new Map()
    for (const [index, tile] of tiles) {
        let nUniqueEdges = 0
        for (const edge of tile.edges) {
            let foundEdge = false
            for (const [i, t] of tiles) {
                if (i == index) continue
                const reversedEdges = t.edges.map((e) => reverse(e))
                if (t.edges.includes(edge) || reversedEdges.includes(edge))
                    foundEdge = true
            }

            if (!foundEdge)
                nUniqueEdges++
        }
        unique.set(index, nUniqueEdges)
    }

    let res = 1
    for (const [i, n] of unique) 
        if (n == 2) res *= i

    return res
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}