import * as React from 'react';

import { Post } from 'components';
import { IPost } from 'models/content';

interface IProps {
    posts: number[];
    postsById: {
        [K: number]: IPost;
    };
}

const renderPost = (postsById: {
    [K: number]: IPost;
}) => (postId: number) => <Post
    key={ postId }
    item={ postsById[postId] }
    isSingle={ false }
/>;

export const PostList: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        posts,
        postsById
    } = props;

    const render = renderPost(postsById);

    return <div>
        { posts.map(render) }
    </div>;
};
