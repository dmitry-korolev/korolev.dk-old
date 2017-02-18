import * as React from 'react';

import { Post } from 'components';

interface IProps {
    itemIds: number[];
}

const renderPost = (itemId: number) => <Post
    key={ itemId }
    itemId={ itemId }
/>;

const PostList: React.StatelessComponent<IProps> = (props: IProps) => {
    const { itemIds } = props;

    return <div>
        { itemIds.map(renderPost) }
    </div>;
};

PostList.displayName = 'PostList';

export { PostList };
