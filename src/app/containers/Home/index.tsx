import * as React from 'react';
// import { asyncConnect } from 'redux-connect';

// Components
// import { PostList } from 'components/PostList/index';
const s = require('./style.css');

// @asyncConnect(
//
// )
class Home extends React.Component<any, any> {
    public render() {
        return (
            <section className={ s.home }>
                123
                { /*<PostList*/ }

                { /*/>*/ }
            </section>
        );
    }
}

export { Home }
