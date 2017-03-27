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
            _id: 'nulla enim',
            author: 56006760,
            content: 'cupidatat reprehen',
            created: '3441-04-21T01:38:54.614Z',
            excerpt: 'ad laborum elit Duis',
            format: 'quote',
            id: -95740141,
            slug: 'ea Duis proident',
            status: 'publish',
            sticky: true,
            tags: [
                59976191,
                6569315,
                40547114,
                88260907
            ],
            title: 'magna aliqua amet',
            type: 'page',
            modified: '3743-06-27T17:40:49.331Z'
        })).to.equal(true);

        expect(validatePost({
            _id: 'nulla enim',
            author: 56006760,
            content: 'cupidatat reprehen',
            created: '3441-04-21T01:38:54.614Z',
            excerpt: 'ad laborum elit Duis',
            format: 'quote',
            id: -95740141,
            slug: 'ea Duis proident',
            status: 'publish',
            sticky: true,
            tags: [
                59976191,
                6569315,
                40547114,
                88260907
            ],
            title: 'magna aliqua amet',
            type: 'page',
            modified: '3743-06-27T17:40:49.331Z'
        })).to.equal(false);
    });
});
