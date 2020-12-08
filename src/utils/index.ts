import fs from 'fs'

const BASE_DIR = 'inputs'

export const readInput = (filename, separator: string = '\n') => {
    return fs.readFileSync(`${BASE_DIR}/${filename}`).toString().split(separator)
}