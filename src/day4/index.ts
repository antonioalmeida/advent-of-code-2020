const fs = require('fs')
import { readInput } from '../utils'

interface Keys {
    byr?: string
    iyr?: string
    eyr?: string
    hgt?: string
    hcl?: string
    ecl?: string
    pid?: string
}

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

export const part1 = () => {

    const arr = readInput('day4.in', "\n\n").map((entry) => {
        const keys = entry.split('\n').flat().map((passport) => passport.split(' ').map((entry) => entry.split(':')[0])).flat()

        return requiredKeys.filter((x) => !keys.includes(x)).length > 0 ? false : true
    })

    // const arr = fs.readFileSync('input1.txt').toString().split("\n\n").map((entry) => {
    //     const keys = entry.split('\n').flat().map((passport) => passport.split(' ').map((entry) => entry.split(':')[0])).flat()

    //     return requiredKeys.filter((x) => !keys.includes(x)).length > 0 ? false : true
    // })

    // @ts-ignore
    return arr.reduce((a:boolean , b:boolean) => a + b)
}

const validate = (passport) => {

    let parsedPassport: Keys = {}
    passport.forEach(element => {
        parsedPassport = { 
            ...parsedPassport,
            ...element
        }    
    })
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parsedPassport
    const missingKeys = requiredKeys.filter((x) => !Object.keys(parsedPassport).includes(x)).length
    if (missingKeys > 0) return false
    if (parseInt(byr) < 1920 || parseInt(byr) > 2002) return false
    if (parseInt(iyr) < 2010 || parseInt(iyr) > 2020) return false
    if (parseInt(eyr) < 2020 || parseInt(eyr) > 2030) return false
    if (!/^(1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in$/.test(hgt)) return false
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    if (!validColors.includes(ecl)) return false
    if (!/^#[a-f0-9]{6}$/.test(hcl)) return false
    if (!/^\d{9}$/.test(pid)) return false

    return true
}

export const part2 = () => {

    const arr = fs.readFileSync('day4.in').toString().split("\n\n").map((entry) => {
        const keys = entry.split('\n').flat().map((passport) => passport.split(' ').map((entry) => {
            const kv = entry.split(':')
            return { [kv[0]]: kv[1] }
        })).flat()
        
        return validate(keys)
    })

    return arr.reduce((a, b) => a + b)
}