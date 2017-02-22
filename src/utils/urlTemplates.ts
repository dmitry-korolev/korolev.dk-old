import { ICategory, IPost } from 'models/content';

export const postUrlTemplate = (post: IPost, category: ICategory): string => `/blog/${category.slug}/${post.id}`;
