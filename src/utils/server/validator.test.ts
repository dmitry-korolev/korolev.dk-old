import { expect } from 'chai';
import { validatePost, validateTag } from './validator';

describe('Validators', () => {
    it('should validate tag', () => {
        expect(validateTag({})).to.equal(false);

        expect(validateTag({
            description: 'non',
            title: 'eiusmod consequat',
            taxonomy: 'tags'
        })).to.equal(true);

        expect(validateTag({
            description: 'non',
            title: 'eiusmod consequat',
            taxonomy: 'tags',
            anotherField: 123
        })).to.equal(false);
    });

    it('should validate post', () => {
        expect(validatePost({})).to.equal(false);

        expect(validatePost({
            content: 'officia',
            status: 'draft'
        })).to.equal(true);

        expect(validatePost({
            content: 'officia',
            status: 'draft2',
            type: 'page'
        })).to.equal(false);
    });
});
