import { About, App, Archive, Single } from 'containers';
import * as React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

export default (
    <Route path='/' component={ App }>
        <IndexRoute component={ Archive } />
        <Redirect from='blog' to='/' />
        <Route path='blog/page/:pageNumber' component={ Archive } />
        <Route path='blog/:tagId/page/:pageNumber' component={ Archive } />
        <Route path='blog/:tagId/:postId' component={ Single } />
        <Route path=':pageId' component={ About } />
    </Route>
);
