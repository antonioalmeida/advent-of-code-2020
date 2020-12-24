import { readInput } from '../utils'

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
    const MAX_MOVES = 100
    const circle = readInput('day23.in', '').map((e) => parseInt(e))

    let n = 0
    let currentIndex = 0
    const max = Math.max(...circle)
    const min = Math.min(...circle)

    while (n < MAX_MOVES) {
        const current = circle[currentIndex]
        const removed = pickCups(circle, currentIndex)        

        let destination = current - 1 >= min ? current-1 : max 
        while (removed.includes(destination)) destination = destination > min ? destination-1 : max

        const destinationIndex = circle.indexOf(destination)

        addToDestination(circle, removed, destinationIndex)
        n++
        let nextCurrent = currentIndex

        if (currentIndex > destinationIndex) nextCurrent += 3
        nextCurrent = (nextCurrent + 1) % circle.length

        if (nextCurrent < currentIndex) 
            nextCurrent = nextCurrent - 3 >= 0 ? nextCurrent-3 : 0
        currentIndex = nextCurrent
    }

    return circle.join('')
}

export const part2 = () => {
    const MAX_MOVES = 10000000 
    const labels = readInput('day23.in', '').map((e) => parseInt(e))
    const labelToNext:Map<number, number> = new Map()
    let n = 0

    for (let i = 9; i <= 1000000; i++) labels.push(i)
    for (let i = 1; i <= labels.length; i++) labelToNext.set(labels[i-1], labels[i % labels.length])

    const min = 1
    let max = 0
    for (const l of labels) if (l > max) max = l

    let currentLabel = labels[0]
    while (n < MAX_MOVES) {
        const nextLabel = labelToNext.get(currentLabel)
        const next2Label = labelToNext.get(nextLabel)
        const next3Label = labelToNext.get(next2Label)
        const nextCurrent = labelToNext.get(next3Label)
        const removed = [nextLabel, next2Label, next3Label]

        let destination = currentLabel - 1 >= min ? currentLabel-1 : max 
        while (removed.includes(destination)) destination = destination > min ? destination-1 : max

        const afterDestination = labelToNext.get(destination)
        labelToNext.set(currentLabel, nextCurrent)
        labelToNext.set(destination, nextLabel)
        labelToNext.set(nextLabel, next2Label)
        labelToNext.set(next2Label, next3Label)
        labelToNext.set(next3Label, afterDestination)

        n++
        currentLabel = nextCurrent
    }

    const one = labelToNext.get(1)
    const next = labelToNext.get(one)
    return one*next
}