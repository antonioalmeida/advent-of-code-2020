import * as day1 from './day1'
import * as day2 from './day2'
import * as day3 from './day3'
import * as day4 from './day4'
import * as day5 from './day5'
import * as day6 from './day6'
import * as day7 from './day7'
import * as day8 from './day8'
import * as day9 from './day9'

const days = { day1, day2, day3, day4, day5, day6, day7, day8, day9 }

import yargs from 'yargs' 
import { hideBin } from 'yargs/helpers'

export const runProblem = (day: string, part: string) => {
    const problem = `day${day}.part${part}`
    console.log('Running', problem)
    // tslint:disable-next-line: no-eval
    if (typeof eval(`${problem}`) === 'function') {
      // tslint:disable-next-line: no-eval
        const result = eval(`${problem}()`)
        console.log('Result:', result)
    }
    else
      console.log('No such problem!')
}

const argv = yargs(hideBin(process.argv)).argv
const day: any = argv.day
const part: any = argv.part

if (parseInt(day) > Object.keys(days).length || parseInt(day) < 0)
    console.log('Invalid day:', argv.day)

runProblem(day, part)


