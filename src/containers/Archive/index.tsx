import * as React from 'react';
import { asyncConnect } from 'redux-connect';
import { equals, path } from 'utils/ramda';

// Actions
import { getPosts } from 'state/posts';

// Components
import { PostList } from 'components';
import { IConnectArguments, IStore } from 'models/store';

interface IProps {
    posts: number[];
}

const basepathP = path(['location', 'basepath']);

@asyncConnect(
    [{
        promise: ({ store: { dispatch, getState }, params: { pageNumber } }: IConnectArguments ): Promise<void> => {
            const { application } = getState();

            return dispatch(getPosts({
                pagination: {
                    pageNumber: pageNumber || 1,
                    key: basepathP(application)
                }
            }));
        }
    }],
    ({ pagination, application }: IStore, { router: { params: { pageNumber } } }: any) => {
        return {
            posts: path([basepathP(application), pageNumber || 1], pagination) || []
        };
    }
)
class Archive extends React.PureComponent<IProps, any> {
    public shouldComponentUpdate({ posts }: IProps): boolean {
        return !equals(this.props.posts, posts);
    }

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
