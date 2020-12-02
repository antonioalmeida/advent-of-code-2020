const fs = require('fs');

const arr = fs.readFileSync('input1.txt').toString().split("\n").map((entry) => {
    const parts = entry.split(':') 

    const [min,rest] = parts[0].split('-')
    const [max, char] = rest.split(' ')

    const password = parts[1].trim()

    return { min, max, char, password }
})

const part1 = () => {

    const valids = arr.map((entry) => {
        let nOccurrences = 0
        entry.password.split('').forEach(element => {
            if (element == entry.char) 
                nOccurrences++
        });
        
        return nOccurrences >= entry.min && nOccurrences <= entry.max
    })

    return valids.reduce((a,b) => a+b)
}

console.log('Part 1:', part1())