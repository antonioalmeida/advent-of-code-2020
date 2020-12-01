const fs = require('fs');

const arr = fs.readFileSync('input1.txt').toString().split("\n").map((entry) => Number(entry))

const part1 = () => {
    for (i in arr) {
        for (j in arr.slice(i, arr.length + 1)) {
            sum = arr[i] + arr[j] 
            mult = arr[i] * arr[j] 
            if (sum === 2000) 
                return mult
        }
    }
}

const part2 = () => {
    for (i in arr) {
        for (j in arr.slice(i, arr.length + 1)) {
            for (k in arr.slice(j, arr.length + 1)) {
                sum = arr[i] + arr[j] + arr[k]
                mult = arr[i] * arr[j] * arr[k]
                //console.log(sum, mult)
                if (sum === 2000) {
                    return mult
                }
            }
        }
    }
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
