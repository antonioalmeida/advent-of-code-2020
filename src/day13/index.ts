import { readInput } from '../utils'

export const part1 = () => {
    const [time, busIds] = readInput('day13.in')
    const targetTime = parseInt(time)
    const buses:Array<number> = busIds.split(',').filter((id) => id != 'x').map((bus) => parseInt(bus))

    const departureTimes = []
    for (const bus of buses) {
        let time = bus
        while(time <= targetTime) 
            time += bus
        departureTimes.push({ bus, time})
    }

    departureTimes.sort((a,b) => a.time - b.time)

    const targetBus = departureTimes[0]
    return targetBus.bus * (targetBus.time - targetTime)
}

export const part2 = () => {
    const [_, busIds] = readInput('example13.in')
    const buses = busIds.split(',').map((bus, index) => ({ bus, index }))
                        .filter(({bus, index}) => bus != 'x')
                        .map(({bus, index}) => ({ bus: parseInt(bus), index, res: parseInt(bus) - index}))

    console.log(buses)
}

