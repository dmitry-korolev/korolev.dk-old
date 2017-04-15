import { About, App, Archive, Single } from 'containers';
import * as React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

export default (
    <Route path='/' component={ App }>
        <IndexRoute component={ Archive } />
        <Redirect from='blog' to='/' />
        <Route path='page/:pageNumber' component={ Archive } />
        <Route path='blog/:postId' component={ Single } />
        <Route path='blog/:tagId/page/:pageNumber' component={ Archive } />
        <Route path=':pageId' component={ About } />
    </Route>
);
