import { expect } from 'chai';
import { replace } from './replace';

describe('Replace', () => {
    it('should replace, simple', () => {
        const template = 'Hello, {name}';
        const data = {
            name: 'World'
        };

        expect(replace(template, data)).to.equal('Hello, World');
    });

    it('should replace, hard', () => {
        const template = 'Hello, {name}, Hello, {surname}, Hello, {name}, Hello, {surname}';
        const data = {
            name: 'World',
            surname: 'magnificent'
        };

        expect(replace(template, data)).to.equal('Hello, World, Hello, magnificent, Hello, World, Hello, magnificent');
    });
});
