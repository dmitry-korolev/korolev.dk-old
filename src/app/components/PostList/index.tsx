import * as React from 'react';

import { Post } from 'components';
import { IPost } from 'models/post';

interface IProps {
    posts: IPost[];
}

const renderPost = (post: IPost) => <Post
    item={ post }
    isSingle={ false }
/>;

export const PostList: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        posts
    } = props;

    return <div>
        { posts.map(renderPost) }
    </div>;
};
