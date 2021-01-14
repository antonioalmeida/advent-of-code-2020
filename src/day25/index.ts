import { readInput } from '../utils'

const transformSubject = (s=7, l) => {
    let n = 1
    while(l-- > 0) {
        n *= s
        n %= 20201227
    }
    return n
}

const findLoopSize = (targetKey, s=7) => {
    let n = 1
    let l = 0
    while(n != targetKey) { 
        n *= s
        n %= 20201227
        l++
    }
    return l
}

export const part1 = () => {
    const cardPublicKey = 7573546
    const doorPublicKey = 17786549

    const cardLoopSize = findLoopSize(cardPublicKey)
    // Optional
    //const doorLoopSize = findLoopSize(doorPublicKey)

    const encryptionKey = transformSubject(doorPublicKey, cardLoopSize)
    return encryptionKey
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')
}