import { expect } from 'chai';
import { calcPage } from './calcPage';

describe('calcPage', () => {
    it('should calculate query params for given page number and items per page info', () => {
        expect(calcPage(10, 1)).to.eql({
            $skip: 0,
            $limit: 10
        });

        expect(calcPage(10, 2)).to.eql({
            $skip: 10,
            $limit: 10
        });

        expect(calcPage(100, 30)).to.eql({
            $skip: 2900,
            $limit: 100
        });
    });
});
