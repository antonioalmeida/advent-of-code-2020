const fs = require('fs')

const arr = fs.readFileSync('input1.txt').toString().split("\n")
            .map((line) => {
                const row = parseInt(line.slice(0,7).split('').map((char) => {
                    if (char == 'F') return 0
                    if (char == 'B') return 1
                }).join(''),2)
            
                const col = parseInt(line.slice(7).split('').map((char) => {
                    if (char == 'L') return 0 
                    if (char == 'R') return 1 
                }).join(''),2)
            
                return row*8+col
            })
            .sort((a,b) => a-b)

const part1 = () => {
    return arr[arr.length-1]
}

const part2 = () => {

    for (let id = 0; id< arr.length; id++) { 
        if (arr[id + 1] - arr[id] > 1)
            return arr[id] + 1
    }
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
