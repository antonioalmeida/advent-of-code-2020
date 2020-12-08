import { readInput } from '../utils'

export const part1 = () => {
    const arr = readInput('day1.in').map((entry) => Number(entry))
    for (let [i, _] of arr.entries()) {
        for (let [j,_] of arr.slice(i, arr.length + 1).entries()) {
            const sum = arr[i] + arr[j] 
            const mult = arr[i] * arr[j] 
            if (sum === 2000) 
                return mult
        }
    }
}

export const part2 = () => {
    const arr = readInput('day1.in').map((entry) => Number(entry))
    for (let [i, _] of arr.entries()) {
        for (let [j,_] of arr.slice(i, arr.length + 1).entries()) {
            for (let [k,_] of arr.slice(j, arr.length + 1).entries()) {
                const sum = arr[i] + arr[j] + arr[k]
                const mult = arr[i] * arr[j] * arr[k]
                if (sum === 2000) {
                    return mult
                }
            }
        }
    }
}