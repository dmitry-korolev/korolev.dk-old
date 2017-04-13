import * as React from 'react';

import { Post } from 'components';

interface IProps {
    itemIds: number[];
}

const renderPost = (itemId: number): JSX.Element => (
    <Post
        key={ itemId }
        itemId={ itemId }
    />
);

const PostList: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    const { itemIds = [] } = props;

    return (
        <div>
            { itemIds.map(renderPost) }
        </div>
    );
};

PostList.displayName = 'PostList';

export { PostList };
