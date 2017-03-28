import * as Ajv from 'ajv';

const headline = require('schemas/headline.json');
const option = require('schemas/option.json');
const post = require('schemas/post.json');
const tag = require('schemas/tag.json');
const user = require('schemas/user.json');

const ajv = new Ajv();

const validateHeadline = ajv.compile(headline);
const validateOption = ajv.compile(option);
const validatePost = ajv.compile(post);
const validateTag = ajv.compile(tag);
const validateUser = ajv.compile(user);

export {
    validateHeadline,
    validateOption,
    validatePost,
    validateTag,
    validateUser
}
