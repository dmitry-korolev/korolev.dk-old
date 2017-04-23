import { App, Archive, Single } from 'containers';
import * as React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';
import { postUrlTemplate, pageUrlTemplate, tagUrlTemplate } from 'utils';

const postUrl = postUrlTemplate(':postId');
const pageUrl = pageUrlTemplate(':pageId');
const tagUrl = tagUrlTemplate(':tagId');

export default (
    <Route path='/' component={ App }>
        { /* Redirects */ }
        <Redirect from='blog' to='/' />
        <Redirect from='blog/:tagId/:postId/' to={ postUrl } />
        <Redirect from='blog/:tagId/:postId/page/:pageNumber/' to={ `${postUrl}/page/:pageNumber/` } />
        <Redirect from='cats/:tagId/' to='archive/:tagId/' />
        <Redirect from='dogs/:tagId/' to='archive/:tagId/' />
        <Redirect from='cats/:tagId/page/:pageNumber/' to='archive/:tagId/page/:pageNumber/' />
        <Redirect from='dogs/:tagId/page/:pageNumber/' to='archive/:tagId/page/:pageNumber/' />

        { /* Main archive */ }
        <IndexRoute component={ Archive } />
        <Route path='page/:pageNumber/' component={ Archive } />

        { /* Posts */ }
        <Route path={ postUrl } component={ Single } />
        <Route path={ `${postUrl}/page/:pageNumber/` } component={ Single } />

        { /* Archives */ }
        <Route path={ tagUrl } component={ Archive } />
        <Route path={ `${tagUrl}/page/:pageNumber/` } component={ Archive } />

        { /* Pages */ }
        <Route path={ pageUrl } component={ Single } />
        <Route path={ `${pageUrl}/page/:pageNumber/` } component={ Single } />
    </Route>
);
