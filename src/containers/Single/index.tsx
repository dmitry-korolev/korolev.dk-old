import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPost } from 'state/posts';

// Components
import { Post } from 'components';
import { IAsyncConnectArguments, IAsyncConnectOwnProps } from 'models/store';

interface IProps {
    postId: number;
}

@asyncConnect(
    [{
        promise({ store: { dispatch }, params: { postId } }: IAsyncConnectArguments): any {
            return dispatch(getPost(postId));
        }
    }],
    (_: any, { params }: IAsyncConnectOwnProps) => ({
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