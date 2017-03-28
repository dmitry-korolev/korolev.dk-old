import * as Ajv from 'ajv';

const tag = require('schemas/tag.json');
const post = require('schemas/post.json');
const ajv = new Ajv();

const validateTag = ajv.compile(tag);
const validatePost = ajv.compile(post);

export {
    validateTag,
    validatePost
}
