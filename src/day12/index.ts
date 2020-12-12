import { readInput } from '../utils'

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
};

export const part1 = () => {

    const instructions = readInput('day12.in').map((entry) => {
        return { op: entry[0], value: parseInt(entry.slice(1)) }
    })

    let state = { x: 0, y: 0, dir: 'E' }

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


const rotate = (state, arg) => {
    const { wpx, wpy } = state
    const cos = Math.round(Math.cos(degToRad(arg)))
    const sin = Math.round(Math.sin(degToRad(arg)))
    state.wpx = wpx * cos - wpy * sin
    state.wpy = wpx * sin + wpy * cos
}

export const part2 = () => {

    const instructions = readInput('day12.in').map((entry) => {
        return { op: entry[0], value: parseInt(entry.slice(1)) }
    })

    let state = { x: 0, y: 0, wpx: 10, wpy: 1, wpa: Math.atan2(10,1)}

    const operations = {
        'N': ((st, arg) => st.wpy += arg),
        'S': ((st, arg) => st.wpy -= arg),
        'E': ((st, arg) => st.wpx += arg),
        'W': ((st, arg) => st.wpx -= arg),
        'L': ((st, arg) => rotate(st, arg)),
        'R': ((st, arg) => rotate(st, -arg)),
        'F': ((st, arg) => { st.x += arg*st.wpx; st.y += arg*st.wpy})
    }

    for (const {op, value} of instructions) 
        operations[op](state, value)

    return { ...state, res: Math.abs(state.x)+Math.abs(state.y) }
}