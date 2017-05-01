import * as path from 'path';

export const dbPath = process.env.NODE_ENV === 'production' ?
    (filename: string): string => path.join(__dirname, 'db', filename) :
    (filename: string): string => path.join('db', filename);
