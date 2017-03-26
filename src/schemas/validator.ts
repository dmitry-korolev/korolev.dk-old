import * as Ajv from 'ajv';

const category = require('./category.json');
const post = require('./post.json');
const ajv = new Ajv();

const validateCategory = ajv.compile(category);
const validatePost = ajv.compile(post);

export {
    validateCategory,
    validatePost
}
