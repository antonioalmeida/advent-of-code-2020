import { readInput } from '../utils'

const MAX_MOVES = 100

const pickCups = (arr: number[], current:number) => {
    if (current + 3 < arr.length) 
        return arr.splice(current+1, 3)
    
    const nBack = arr.length - current - 1
    const nFront = 3 - nBack

    return [...arr.splice(current+1, nBack), ...arr.splice(0, nFront)]
}

const addToDestination = (arr: number[], items: number[], index: number) => {
    return arr.splice(index+1, 0, ...items)
}

export const part1 = () => {
    const circle = readInput('day23.in', '').map((e) => parseInt(e))

    let n = 0
    let currentIndex = 0
    const max = Math.max(...circle)
    const min = Math.min(...circle)

    while (n < MAX_MOVES) {
        console.log('move', n+1)
        console.log('cups', circle)

        const current = circle[currentIndex]
        console.log('current', current)
        const removed = pickCups(circle, currentIndex)        
        console.log('pick up', removed)

        let destination = current - 1 >= min ? current-1 : max 
        while (removed.includes(destination)) 
            destination = destination > min ? destination-1 : max
        console.log('destination', destination)

        const destinationIndex = circle.indexOf(destination)
        console.log('destination index', destinationIndex)
        console.log('cups', circle)

        addToDestination(circle, removed, destinationIndex)
        n++
        let nextCurrent = currentIndex
        console.log('nextcurrent', nextCurrent)

        if (currentIndex > destinationIndex) nextCurrent += 3
        nextCurrent = (nextCurrent + 1) % circle.length

        if (nextCurrent < currentIndex) 
            nextCurrent = nextCurrent - 3 >= 0 ? nextCurrent-3 : 0
        currentIndex = nextCurrent
        console.log('currentindex', currentIndex)
        console.log('')
    }

    console.log(circle)
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}