import { readInput } from '../utils'

const arr = readInput('day2.in').map((entry) => {
    const parts = entry.split(':') 
    const [min,rest] = parts[0].split('-')
    const [max, char] = rest.split(' ')
    const password = parts[1].trim()

    return { min: parseInt(min), max: parseInt(max), char, password }
})

export const part1 = () => {

    const valids = arr.map((entry) => {
        let nOccurrences = 0
        entry.password.split('').forEach(element => {
            if (element == entry.char) 
                nOccurrences++
        });
        
        return nOccurrences >= entry.min && nOccurrences <= entry.max
    })

    // @ts-ignore
    return valids.reduce((a,b) => a+b)
}

export const part2 = () => {

    const valids = arr.map((entry) => {
        let nOccurrences = 0
        if (entry.password[entry.min-1] == entry.char)
            nOccurrences++
        if (entry.password[entry.max-1] == entry.char)
            nOccurrences++
        
        return nOccurrences == 1
    })

    // @ts-ignore
    return valids.reduce((a,b) => a+b)
}
