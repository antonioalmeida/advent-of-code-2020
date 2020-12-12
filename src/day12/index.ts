import { readInput } from '../utils'

export const part1 = () => {

    const instructions = readInput('day12.in').map((entry) => {
        return { op: entry[0], value: parseInt(entry.slice(1)) }
    })

    let state = { x: 0, y: 0, dir: 'E' }



    for (const {op, value} of instructions) {

        console.log(op, state)
        if(op == 'F') {
            console.log(state.dir)
            operations[state.dir](state, value)
        }
        else 
            operations[op](state, value)
    }

    return {
        ...state,
        res: Math.abs(state.x)+Math.abs(state.y)
    }
}

const angles = {
    0: 'E',
    90: 'S',
    180: 'W',
    270: 'N',
    'E': 0,
    'S': 90,
    'W': 180,
    'N': 270
}

const operations = {
    'N': ((state, arg) => { state.y += arg }),
    'S': ((state, arg) => { state.y -= arg }),
    'E': ((state, arg) => { state.x += arg }),
    'W': ((state, arg) => { state.x -= arg }),
    'R': ((state, arg) => {
        let finalAngle = (angles[state.dir] + arg) % 360
        finalAngle += finalAngle < 0 ? 360 : 0
        state.dir = angles[finalAngle]
    }),
    'L': ((state, arg) => {
        let finalAngle = (angles[state.dir] - arg) % 360
        finalAngle += finalAngle < 0 ? 360 : 0
        state.dir = angles[finalAngle]
    })
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}