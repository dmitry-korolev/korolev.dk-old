import {
  join,
  map,
  pipe,
  split,
  toLower,
  toUpper
} from 'utils/ramda'

type IToCamelCase = (input: string) => string

const upperFirst = (word: string): string => toUpper(word[0]) + word.slice(1)
const lowerFirst = (word: string): string => toLower(word[0]) + word.slice(1)

const toCamelCase: IToCamelCase = pipe(
  toLower,
  split('_'),
  map(upperFirst),
  join(''),
  lowerFirst
)

export {
  toCamelCase
}
