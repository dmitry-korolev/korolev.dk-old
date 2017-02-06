import * as React from 'react';
import { asyncConnect } from 'redux-connect';

// Actions
import { getPosts } from 'state/modules/posts';

// Components
import { PostList } from 'components';

// Styles
const s = require('./style.css');

@asyncConnect(
    [{
        promise: ({ store: { dispatch } }) => dispatch(getPosts())
    }],
    ({
        posts
    }) => ({
        posts
    })
)
class Home extends React.Component<any, any> {
    public render() {
        const {
            posts: {
                posts,
                postsById
            }
        } = this.props;

        return (
            <section className={ s.home }>
                <PostList
                    posts={ posts }
                    postsById = { postsById }
                />
            </section>
        );
    }
}

export { Home }
