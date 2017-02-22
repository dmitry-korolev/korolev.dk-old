import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPosts } from 'state/posts';

// Components
import { PostList } from 'components';
import { IStore } from 'models/store';
import { Dispatch } from 'redux';

interface IProps {
    posts: number[];
}

@asyncConnect(
    [{
        promise: ({ store: { dispatch } }: { store: { dispatch: Dispatch<any> } }): any => dispatch(getPosts())
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
