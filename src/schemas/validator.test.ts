import { expect } from 'chai';
import { validateCategory, validatePost } from './validator';

describe('Validators', () => {
    it('should validate category', () => {
        expect(validateCategory({})).to.equal(false);

        expect(validateCategory({
            description: 'non',
            title: 'eiusmod consequat',
            taxonomy: 'categories'
        })).to.equal(true);

        expect(validateCategory({
            description: 'non',
            title: 'eiusmod consequat',
            taxonomy: 'categories',
            anotherField: 123
        })).to.equal(false);
    });

    it('should validate post', () => {
        expect(validatePost({})).to.equal(false);

        expect(validatePost({
            categories: [
                1,
                2
            ],
            tags: [
                1
            ],
            content: 'dolor adipisicing el',
            excerpt: 'amet ipsum',
            format: 'standard',
            slug: 'proident et commodo aliquip',
            status: 'publish',
            sticky: true,
            subtitle: 'in ut exercitation nisi',
            title: 'quis',
            type: 'post',
            created: '2014-12-14T08:34:04.792Z',
            modified: '2017-04-21T12:07:57.090Z',
            id: 2,
            _id: '2',
            author: 75071718
        })).to.equal(true);

        expect(validatePost({
            categories: [
                -1,
                2
            ],
            tags: [
                1
            ],
            content: 'dolor adipisicing el',
            excerpt: 'amet ipsum',
            format: 'standard',
            slug: 'proident et commodo aliquip',
            status: 'publish',
            sticky: true,
            subtitle: 'in ut exercitation nisi',
            title: 'quis',
            type: 'post',
            created: '2014-12-14T08:34:04.792Z',
            modified: '2017-04-21T12:07:57.090Z',
            id: 2,
            _id: '2',
            author: 75071718
        })).to.equal(false);
    });
});
