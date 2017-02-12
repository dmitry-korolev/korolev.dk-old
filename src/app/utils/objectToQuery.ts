const objectToQuery = (object: { [K: string]: string }): string => Object.keys(object)
    .reduce((result, key) => (result += `&${key}=${encodeURIComponent(object[key])}`), '')
    .slice(1);
