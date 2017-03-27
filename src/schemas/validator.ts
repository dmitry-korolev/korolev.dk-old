import * as Ajv from 'ajv';

const tag = require('./tag.json');
const post = require('./post.json');
const ajv = new Ajv();

const validateTag = ajv.compile(tag);
const validatePost = ajv.compile(post);

export {
    validateTag,
    validatePost
}
