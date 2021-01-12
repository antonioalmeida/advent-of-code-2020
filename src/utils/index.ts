import fs from 'fs'

const BASE_DIR = 'inputs'

export const readInput = (filename, separator: string = '\n') => {
    return fs.readFileSync(`${BASE_DIR}/${filename}`).toString().split(separator)
}

export const reverse = (str: string): string => {
    return str.split('').reverse().join('')
}

export function intersection(...args: any[]) {
    const result = [];
    let lists;

    if (args.length === 1) {
        lists = args[0];
    } else {
        lists = args;
    }

    for (let i = 0; i < lists.length; i++) {
        var currentList = lists[i];
        for (let y = 0; y < currentList.length; y++) {
            const currentValue = currentList[y];
            if (result.indexOf(currentValue) === -1) {
                if (lists.filter(function (obj) { return obj.indexOf(currentValue) == -1 }).length == 0) {
                    result.push(currentValue);
                }
            }
        }
    }
    return result;
}

export function difference<T>(arr1: Array<T>, arr2: Array<T>) {
    return arr1.filter(x => !arr2.includes(x));
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

