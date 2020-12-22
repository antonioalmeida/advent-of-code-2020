import { readInput, intersection } from '../utils'

export const part1 = () => {
    const allergenToIngredients:Map<string, string[][]> = new Map()
    const appearanceCount:Map<string, number> = new Map()
    const noAllergens: Set<string> = new Set()

    readInput('day21.in')
        .map((line) => {
            const [left, right] = line.split(' (')
            const ingredients = left.split(' ')
            const allergens = right.slice(9, -1).split(', ')

            for (const i of ingredients) {
                noAllergens.add(i)
                if (appearanceCount.has(i))
                    appearanceCount.set(i, appearanceCount.get(i)+1)
                else
                    appearanceCount.set(i, 1)
            }

            for (const a of allergens) {
                if (allergenToIngredients.has(a))
                    allergenToIngredients.get(a).push(ingredients)
                else
                    allergenToIngredients.set(a, [ingredients])
            }
            return { ingredients, allergens }
        })

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
    console.log('Done in Python. Needs rewrite.')
}