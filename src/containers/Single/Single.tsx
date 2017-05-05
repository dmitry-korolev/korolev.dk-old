import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPost } from 'state/posts';
import { getPage } from 'state/pages';

// Components
import { Post } from 'components';
import { IConnectArguments, IAsyncConnectOwnProps, IStore } from 'models/store';

interface IProps {
    postId?: string;
    pageId?: string;
}

@asyncConnect(
    [{
        promise: ({ store: { dispatch }, params: { postId, pageId } }: IConnectArguments): Promise<void> => {
            if (postId) {
                return dispatch(getPost(postId));
            }

            return dispatch(getPage(pageId));
        }
    }],
    (_: IStore, { params }: IAsyncConnectOwnProps = {}) => ({
        postId: params.postId,
        pageId: params.pageId
    })
)
class Single extends React.PureComponent<IProps, any> {
    public render(): JSX.Element {
        const { postId, pageId } = this.props;
        const postType = postId ? 'post' : 'page';

        return (
            <section>
                <Post
                    itemId={ postId || pageId }
                    isSingle={ true }
                    mod={ postType }
                />
            </section>
        );
    }
}

export { Single }
