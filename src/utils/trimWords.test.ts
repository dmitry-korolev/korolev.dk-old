import { expect } from 'chai';
import { trimWords } from './trimWords';

xdescribe('trimWords', () => {
    it('should trim sentence by words', () => {
        expect(trimWords('yretwqs drwqreqs erhyer etygfer', 2)).to.equal('yretwqs');
    });
});
