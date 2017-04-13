import { IPost } from 'models/posts';
import { ITag } from 'models/tags';

export const postUrlTemplate = (post: IPost, tag: ITag): string => `/blog/${tag._id}/${post._id}`;
