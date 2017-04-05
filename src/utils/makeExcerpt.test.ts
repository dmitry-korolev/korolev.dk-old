import { expect } from 'chai';
import { makeExcerpt } from './makeExcerpt';

describe('makeExcerpt', () => {
    it('should trunkate input to 300 symbols and add ellipsis', () => {
        expect(makeExcerpt('test')).to.equal('test');

        expect(makeExcerpt(Array(50).join('blabla'))).to.have.length.of.at.most(303);
        expect(makeExcerpt(Array(100).join('blabla'))).to.have.length.of.at.most(303);
        expect(makeExcerpt(Array(200).join('blabla'))).to.have.length.of.at.most(303);
        expect(makeExcerpt(Array(100).join('blabla')).endsWith('...')).to.be.true;
    });
});
