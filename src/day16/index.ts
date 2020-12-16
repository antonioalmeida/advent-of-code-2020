import { readInput } from '../utils'

const min = 0
const max = 1

const getInput = () => {
    const [rawRules, rawTicket, rawNearby] = readInput('day16.in', '\n\n')

    const rules = rawRules.split('\n').map((line) => {
        const [name, _rule] = line.split(':')
        const rule = _rule.split('or').map((r) =>{ r.trim(); return r.split('-').map((e) => parseInt(e)) })
        return { name, rule0: rule[0], rule1: rule[1] }
    })

    const ticket = rawTicket.split('\n')[1].split(',').map((e) => parseInt(e))
    const nearby = rawNearby.split('\n').slice(1).map((line) => line.split(',').map((e) => parseInt(e)))
    

    return {rules, ticket, nearby}
}

export const part1 = () => {

    const {rules, ticket, nearby} = getInput()

    const wrong:Array<number> = []

    for (const t of nearby) {
        // @ts-ignore
        const left = t.filter((field) => rules.map((
            {rule0, rule1}) => (field >= rule0[min] && field <= rule0[max]) || (field >= rule1[min] && field <= rule1[max]) 
        )
        // @ts-ignore
        .reduce((a,b) => a+b) == 0)

        wrong.push(...left)
    }

    return wrong.reduce((a,b) => a+b)
}

export const part2 = () => {
    const {rules, ticket, nearby} = getInput()

    return 0
}