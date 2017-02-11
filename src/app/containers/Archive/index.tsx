import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPosts } from 'state/modules/posts';

// Components
import { PostList } from 'components';

// Styles
const s = require('./style.css');

interface IProps {
    posts: number[];
}

@asyncConnect(
    [{
        promise: ({ store: { dispatch } }) => dispatch(getPosts())
    }],
    ({
        posts
    }) => ({
        posts: posts.posts
    })
)
class Archive extends React.Component<IProps, any> {
    public render() {
        const {
            posts
        } = this.props;

        return (
            <section className={ s.home }>
                <PostList
                    itemIds={ posts }
                />
            </section>
        );
    }
}

export { Archive }
