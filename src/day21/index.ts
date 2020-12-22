import { readInput, intersection } from '../utils'

const allergenToIngredients: Map<string, string[][]> = new Map()
const appearanceCount: Map<string, number> = new Map()
const noAllergens: Set<string> = new Set()

readInput('day21.in')
    .map((line) => {
        const [left, right] = line.split(' (')
        const ingredients = left.split(' ')
        const allergens = right.slice(9, -1).split(', ')

        for (const i of ingredients) {
            noAllergens.add(i)
            if (appearanceCount.has(i))
                appearanceCount.set(i, appearanceCount.get(i) + 1)
            else
                appearanceCount.set(i, 1)
        }

        for (const a of allergens) {
            if (allergenToIngredients.has(a))
                allergenToIngredients.get(a).push(ingredients)
            else
                allergenToIngredients.set(a, [ingredients])
        }
    })

export const part1 = () => {

    for (const [allergen, ingredients] of allergenToIngredients) {
        const union = ingredients.flat()
        let common = union
        if (ingredients.length > 1)
            common = intersection(...ingredients)

        for (const c of common)
            noAllergens.delete(c)
    }

    let res = 0
    for (const i of noAllergens) {
        res += appearanceCount.get(i)
    }
    return res
}

export const part2 = () => {
    const allergenCommon: Map<string, string[]> = new Map()

    for (const [allergen, ingredients] of allergenToIngredients) {
        const union = ingredients.flat()
        let common = union
        if (ingredients.length > 1)
            common = intersection(...ingredients)

        allergenCommon.set(allergen, common)
    }

    const sortedAllergenCommon = new Map([...allergenCommon.entries()].sort((a,b) => a[1].length - b[1].length));
    const ingredientToAllergen: Map<string, string> = new Map()

    let finished = false
    while (!finished)
    for (const [a, i] of sortedAllergenCommon) {
        finished = true
        if (i.length == 0) continue
        if (i.length == 1) { 
            ingredientToAllergen.set(i[0], a)
            for (const b of sortedAllergenCommon.keys()) 
                sortedAllergenCommon.set(b, sortedAllergenCommon.get(b).filter((e) => e != i[0]))
        }
        else 
            finished = false
    }

    const sortedIngredientToAllergen = new Map([...ingredientToAllergen.entries()].sort((a,b) => a[1].localeCompare(b[1])))
    return [...sortedIngredientToAllergen.keys()].join(',')
}