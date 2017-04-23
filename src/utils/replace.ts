import {
    forEachObjIndexed
} from 'utils/ramda';

const replace = (formatString: string, data: { [K: string]: string | number }): string => {
    let result = formatString;

    forEachObjIndexed((value: string, key: string) => {
        const regExp = new RegExp(`${key}`, 'g');

        result = result.replace(regExp, value);
    }, data);

    return result;
};

export {
    replace
}
