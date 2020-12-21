import { readInput } from '../utils'

class Node {
    left: Node | number
    right: Node | number
    op: '+' | '*'

    constructor(left, right, op) {
        this.left = left
        this.right = right
        this.op = op
    }

    public str(delim:string = '') {
        console.log(delim, 'left:', typeof this.left == 'object' ? this.left.str(delim + '    ') : this.left)
        console.log(delim, 'op:', this.op)
        console.log(delim, 'right:', typeof this.right == 'object' ? this.right.str(delim + '    ') : this.right)
    }
}

const closerFinder = (expression: string[]) => {
    let i = expression.length - 1
    let n = -1
    
    for (i; i > 0; i--) {
        const token = expression[i]  
        if (token == ')') 
            n++
        
        if (token == '(') {
            if(n == 0)
                return i
            else 
                n--
        }
    }
}

const parse = (expression: string) => {
    
    if (expression.length == 0)
        return

    const tokens = expression.split('').filter((e) => e != ' ')

    let i = tokens.length - 1
    const token = tokens[i]

    let left
    let right
    let op

    if (token == ')') {
        const j = closerFinder(tokens)
        const rightExpr = tokens.slice(j+1, i).join('')
        i = j
        right = parse(rightExpr)
    }
    else 
        right = parseInt(token)

    op = tokens[i - 1]
    if (tokens[i-3])
        left = parse(tokens.slice(0, i - 1).join(''))
    else 
        left = parseInt(tokens[i-2])

    return new Node(left, right, op)
}

const op = {
    '+': (a,b) => a+b,
    '*': (a,b) => a*b
}

const evaluate = (node: Node | number) => {

    if (typeof node == 'number') {
        return node
    }

    if (!node.left)
        return evaluate(node.right)

    const res = op[node.op](evaluate(node.left), evaluate(node.right))

    return res
}

export const part1 = () => {
    const ops = readInput('day18.in')

    return ops.map((e) => evaluate(parse(e))).reduce((a,b) => a+b)
}

export const part2 = () => {
    console.log('Done in Python. Needs rewrite.')

}