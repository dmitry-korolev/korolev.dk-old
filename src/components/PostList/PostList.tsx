import * as React from 'react';

import { Post } from 'components';

import * as styles from './PostList.css';

interface IProps {
    itemIds: string[];
}

const renderPost = (itemId: string): JSX.Element => (
    <Post
        className={ styles.postlist_item }
        key={ itemId }
        itemId={ itemId }
        mod='post'
    />
);

const PostList: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    const { itemIds = [] } = props;

    return (
        <div
            className={ styles.postlist }
        >
            { itemIds.map(renderPost) }
        </div>
    );
};

PostList.displayName = 'PostList';

export { PostList };
