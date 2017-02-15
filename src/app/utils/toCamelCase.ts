const pipe = require('ramda/src/pipe');
const join = require('ramda/src/join');
const map = require('ramda/src/map');
const split = require('ramda/src/split');
const toUpper = require('ramda/src/toUpper');
const toLower = require('ramda/src/toLower');

type IToCamelCase = (input: string) => string;

const upperFirst = (word: string): string => toUpper(word[0]) + word.slice(1);
const lowerFirst = (word: string): string => toLower(word[0]) + word.slice(1);

const toCamelCase: IToCamelCase = pipe(
    toLower,
    split('_'),
    map(upperFirst),
    join(''),
    lowerFirst
);

export {
    toCamelCase
}
