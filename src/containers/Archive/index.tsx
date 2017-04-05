import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPosts } from 'state/posts';

// Components
import { PostList } from 'components';
import { IAsyncConnectArguments, IStore } from 'models/store';

interface IProps {
    posts: number[];
}

@asyncConnect(
    [{
        promise: ({ store: { dispatch }, params: { pageNumber } }: IAsyncConnectArguments): Promise<void> =>
            dispatch(getPosts({
                page: pageNumber || 1
            }))
    }],
    ({
        posts
    }: IStore) => ({
        posts: posts.posts
    })
)
class Archive extends React.Component<IProps, any> {
    public render(): JSX.Element {
        const {
            posts
        } = this.props;

        return (
            <section>
                <PostList
                    itemIds={ posts }
                />
            </section>
        );
    }
}

export { Archive }
