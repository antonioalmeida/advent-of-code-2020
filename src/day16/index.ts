import { readInput } from '../utils'

const min = 0
const max = 1

const getInput = () => {
    const [rawRules, rawTicket, rawNearby] = readInput('day16.in', '\n\n')

    const rules = rawRules.split('\n').map((line) => {
        const [name, _rule] = line.split(':')
        const rule = _rule.split('or').map((r) => { r.trim(); return r.split('-').map((e) => parseInt(e)) })
        return { name, rule0: rule[0], rule1: rule[1] }
    })

    const ticket = rawTicket.split('\n')[1].split(',').map((e) => parseInt(e))
    const nearby = rawNearby.split('\n').slice(1).map((line) => line.split(',').map((e) => parseInt(e)))


    return { rules, ticket, nearby }
}

export const part1 = () => {
    const { rules, nearby } = getInput()

    const wrong: Array<number> = []
    for (const t of nearby) {
        // @ts-ignore
        const wrongFields = t.filter((field) => rules.map((
            { rule0, rule1 }) => (field >= rule0[min] && field <= rule0[max]) || (field >= rule1[min] && field <= rule1[max])
        )
            // @ts-ignore
            .reduce((a, b) => a + b) == 0)
        wrong.push(...wrongFields)
    }

    return wrong.reduce((a, b) => a + b)
}

export const part2 = () => {
    const { rules, ticket, nearby } = getInput()
    const correct = []
    for (const t of nearby) {
        // @ts-ignore
        const wrongFields = t.filter((field) => rules.map(( { rule0, rule1 }) => (field >= rule0[min] && field <= rule0[max]) || (field >= rule1[min] && field <= rule1[max]))
            // @ts-ignore
            .reduce((a, b) => a + b) == 0)

        if (wrongFields.length == 0)
            correct.push(t)
    }

    correct.push(ticket) 

    const restrictions = new Map()
    for (const r of rules) {
        restrictions.set(r.name, [])
        let i = 0
        while (i < ticket.length) {
            let validIndex = true
            for (let j = 0; j < correct.length; j++) {
                const val = correct[j][i]
                if ((val < r.rule0[min] || val > r.rule0[max]) && (val < r.rule1[min] || val > r.rule1[max])) {
                    validIndex = false
                    break;
                }
            }
            if (validIndex) restrictions.get(r.name).push(i)
            i++
        }
    }

    const sortedRestrictions = new Map([...restrictions.entries()].sort((a,b) => a[1].length - b[1].length));
    const assignments = new Map()
    for (const [field, possible] of sortedRestrictions.entries()) {

        if (possible.length == 1) {
            assignments.set(possible[0], field)

            // Remove updated entry
            for (const [f, p] of sortedRestrictions.entries()) 
                sortedRestrictions.set(f ,p.filter((e) => e != possible[0]))
        }
    }

    let res = 1
    for (const [index, field] of assignments.entries()) {
        if (/^departure/.test(field))
            res*= ticket[index]
    }

    console.log('assignments', assignments)
    return res
}
