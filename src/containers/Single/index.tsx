import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPost } from 'state/posts';

// Components
import { Post } from 'components';
import { IConnectArguments, IAsyncConnectOwnProps, IStore } from 'models/store';

interface IProps {
    postId: string;
}

@asyncConnect(
    [{
        promise: ({ store: { dispatch }, params: { postId } }: IConnectArguments): Promise<void> =>
            dispatch(getPost(postId))
    }],
    (_: IStore, { params }: IAsyncConnectOwnProps = {}) => ({
        postId: params.postId
    })
)
class Single extends React.Component<IProps, any> {
    public render(): JSX.Element {
        const { postId } = this.props;

        return (
            <section>
                <Post
                    itemId={ postId }
                    isSingle={ true }
                />
            </section>
        );
    }
}

export { Single }
