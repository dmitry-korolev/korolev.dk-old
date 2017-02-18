import { randomFromArray } from './randomFromArray';

export function randomFromMap<T>(map: Map<string, T>): T {
    return randomFromArray([...map.values()]);
}
