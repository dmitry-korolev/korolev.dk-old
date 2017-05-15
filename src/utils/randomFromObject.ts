import { randomFromArray } from './randomFromArray'

export const randomFromObject = <T> (obj: { [K: string]: T; [K: number]: T; }): T => {
  const keys = Object.keys(obj)
  const randKey = randomFromArray(keys)

  return obj[randKey]
}
