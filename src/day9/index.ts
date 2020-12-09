import { readInput } from '../utils'

const PREAMBLE_SIZE = 25

const verify = (target, arr) => {
    let i = 0;
    for (i = 0; i < arr.length; i++) {
        const curr = arr[i]

        for (let j = i+1; j < arr.length; j++) 
            if(target == (arr[j]+curr) && curr != arr[j]) 
                return true
    }

    return false
}

export const part1 = () => {
    const numbers = readInput('day9.in').map((entry) => Number(entry))
    let start = 0; let current = PREAMBLE_SIZE

    while(current < numbers.length) {
        const currVal = numbers[current]
        const isValid = verify(currVal, numbers.slice(start, current))

        if (!isValid) return currVal
        
        current++; start++
    }

    return -1
}

export const part2 = () => {
    const TARGET = part1()
    const numbers = readInput('day9.in').map((entry) => Number(entry))


    let start = 0; let current = 1
    const targetIndex = numbers.indexOf(TARGET)
    const input = numbers.slice(0, targetIndex)

    while(current < targetIndex) {
        const window = input.slice(start, current)

        const sum = window.reduce((a,b) => a+b)
        if (sum == TARGET) {
            const min = Math.min(...window)
            const max = Math.max(...window)
            return { min, max, sum: min+max }
        }
        
        if (sum > TARGET)
            start++
        else
            current++
    }

    return { min: -1, max: -1 }
}
