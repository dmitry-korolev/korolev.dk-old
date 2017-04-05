import * as Ajv from 'ajv';
import * as headline from 'schemas/headline.json';
import * as option from 'schemas/option.json';
import * as page from 'schemas/page.json';
import * as post from 'schemas/post.json';
import * as tag from 'schemas/tag.json';
import * as user from 'schemas/user.json';

const ajv = new Ajv();

const validateHeadline = ajv.compile(headline);
const validateOption = ajv.compile(option);
const validatePage = ajv.compile(page);
const validatePost = ajv.compile(post);
const validateTag = ajv.compile(tag);
const validateUser = ajv.compile(user);

export {
    validateHeadline,
    validateOption,
    validatePage,
    validatePost,
    validateTag,
    validateUser
}
