import { readInput } from '../utils'

export const part1 = () => {
    const [input, mess] = readInput('day19.in', '\n\n')
    const grammar: Map<number, string> = new Map()
    const grammarRaw = input.split('\n').sort((a, b) => parseInt(a.split(':')[0]) - parseInt(b.split(':')[0]))
        .map((rule) => {
            if (rule.includes('"')) {
                const [index, rest] = rule.split(':')
                const char = rest.match(/"([a-z])"/)[1]
                grammar.set(parseInt(index), char)
                return { index: parseInt(index), rule0: char, rule1: undefined}
            }
            else {
                const [index, rest] = rule.split(':')
                const [rule0, rule1] = rest.split('|').map((e) => e.split(' ').filter((c) => c).map((r) => parseInt(r.trim())))

                return { index: parseInt(index), rule0, rule1 }
            }
        }).filter((e) => e)

    const messages = mess.split('\n')

    const getRule = (index):string => {
        const rule = grammarRaw[index]

        if (grammar.has(index)) {
            return grammar.get(index)
        }
        else if (index == 8) {
            const r0 = `${getRule(rule.rule0[0])}${rule.rule0[1] ? getRule(rule.rule0[1]) : ''}+`
            grammar.set(index, r0)
            return r0
        }
        else if (index == 11) {
            let r = '('; let n = 1;
            while(n < 10) {
                r += `${getRule(rule.rule0[0]).repeat(n)}${getRule(rule.rule0[1]).repeat(n)}`
                r += n == 9 ? ')' : '|'
                n++
            }
            grammar.set(index, r)
            return r
        }
        else {
            const r0 = `(${getRule(rule.rule0[0])}${rule.rule0[1] ? getRule(rule.rule0[1]) : ''}`
            const r1 = rule.rule1 != undefined ? `|${getRule(rule.rule1[0])}${rule.rule1[1] ? getRule(rule.rule1[1]) : ''})` : ')'
            const r = `${r0}${r1}`
            grammar.set(index, r)
            return r
        }
    }

    getRule(0)
    let n = 0
    const regex = RegExp(`^${grammar.get(0)}$`)
    for (const r of messages) 
        if (regex.test(r)) n++

    return n
}

export const part2 = () => {
    console.log('Modified part1. Run part1 instead.')
}