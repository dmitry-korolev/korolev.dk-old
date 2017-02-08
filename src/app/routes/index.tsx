import * as React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import { App, Archive, About } from 'containers';

export default (
    <Route path='/' component={ App }>
        <IndexRoute component={ Archive } />
        <Redirect from='blog' to='/' />
        <Route path='blog/page/:page' component={ Archive } />
        <Route path='blog/:categoryName/page/:page' component={ Archive } />
        <Route path='blog/:categoryName/:postId' component={ Archive } />
        <Route path='about' component={ About } />
    </Route>
);
