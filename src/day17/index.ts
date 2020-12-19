import { readInput } from '../utils'

const ACTIVE = '#'
const INACTIVE = '.'

class State {
    public x: number
    public y: number
    public z: number
    public w: number
    public active: boolean

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    static str = (state: State) => JSON.stringify(({ x: state.x, y: state.y, z: state.z, w: state.w }))

    static getNeighbors = (str: string): Map<State, boolean> => {

        const s = JSON.parse(str)

        const neighbors = new Map()

        for (let x of [-1, 0, 1]) {
            for (let y of [-1, 0, 1]) {
                for (let z of [-1, 0, 1]) {
                    for (let w of [-1, 0, 1]) {
                        if (!(x == 0 && y == 0 && z == 0 && w == 0)) {
                            const state = new State(s.x + x, s.y + y, s.z + z, s.w + w)
                            let active = false
                            if (states.get(State.str(state)))
                                active = true

                            neighbors.set(state, active)
                        }
                    }
                }
            }
        }

        return neighbors
    }

}

let states: Map<string, boolean> = new Map()

export const part1 = () => {

    readInput('day17.in').map((line, x) => line.split('').map((state, y) => states.set(State.str(new State(x, y, 0, 0)), state == ACTIVE)))

    let turn = 0
    while (turn < 6) {
        const newStates: Map<string, boolean> = new Map()
        const nextStates: Map<string, boolean> = new Map()

        for (let [stateStr, active] of states.entries()) {
            const state: State = JSON.parse(stateStr)
            const neighbors = State.getNeighbors(stateStr)

            for (const [s, a] of neighbors.entries())
                newStates.set(State.str(s), a)

            newStates.set(State.str(state), active)
        }

        for (let [stateStr, active] of newStates.entries()) {

            const state: State = JSON.parse(stateStr)
            const neighbors = State.getNeighbors(stateStr)

            let nActive = 0
            for (const active of neighbors.values())
                nActive += active ? 1 : 0

            if (active) {
                let s = false
                if (nActive == 2 || nActive == 3)
                    s = true

                nextStates.set(State.str(new State(state.x, state.y, state.z, state.w)), s)
            }

            if (!active && nActive == 3)
                nextStates.set(State.str(new State(state.x, state.y, state.z, state.w)), true)
        }

        turn++
        states = nextStates
    }

    let nActive = 0
    for (const s of states.values())
        nActive += s ? 1 : 0

    return nActive
}

export const part2 = () => {
    console.log('Modified part 1. Needs rewrite')
}