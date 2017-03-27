import { IPost, ITag } from 'models/content';

export const postUrlTemplate = (post: IPost, tag: ITag): string => `/blog/${tag.slug}/${post.id}`;
