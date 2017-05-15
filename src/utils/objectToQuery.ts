const objectToQuery = (object: { [K: string]: string }): string => Object.keys(object)
  .reduce((result: string, key: string) => (result += `&${key}=${encodeURIComponent(object[key])}`), '')
  .slice(1)
