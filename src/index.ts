import * as day1 from './day1'
import * as day2 from './day2'
import * as day3 from './day3'
import * as day4 from './day4'
import * as day5 from './day5'
import * as day6 from './day6'
import * as day7 from './day7'
import * as day8 from './day8'
import * as day9 from './day9'
import * as day10 from './day10'
import * as day11 from './day11'
import * as day12 from './day12'
import * as day13 from './day13'
import * as day14 from './day14'
import * as day15 from './day15'
import * as day16 from './day16'
import * as day17 from './day17'
import * as day18 from './day18'
import * as day19 from './day19'
import * as day20 from './day20'
import * as day21 from './day21'
import * as day22 from './day22'
import * as day23 from './day23'
import * as day24 from './day24'
import * as day25 from './day25'

const days = { day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25 }

import yargs from 'yargs' 
import { hideBin } from 'yargs/helpers'

export const runProblem = (day: string, part: string) => {
    const problem = `day${day}.part${part}`
    console.log('Running', problem)
    // tslint:disable-next-line: no-eval
    if (typeof eval(`${problem}`) === 'function') {
        const t0 = Date.now()
        // tslint:disable-next-line: no-eval
        const result = eval(`${problem}()`)
        console.log('Result:', result)
        const t1 = Date.now()
        console.log(`Time: ${(t1 - t0)}ms.`)
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


