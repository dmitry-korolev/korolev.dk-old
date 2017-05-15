import { App, Archive, Single } from 'containers'
import * as React from 'react'
import { IndexRoute, Redirect, Route } from 'react-router'
import { paginatedTemplate, postUrlTemplate, pageUrlTemplate, tagUrlTemplate } from 'utils'

const postUrl = postUrlTemplate(':postId')
const pageUrl = pageUrlTemplate(':pageId')
const tagUrl = tagUrlTemplate(':tagId')
const paginate = paginatedTemplate(':pageNumber')

export default (
  <Route path='/' component={ App }>
    { /* Redirects */ }
    <Redirect from='blog' to='/'/>
    <Redirect from='blog/:tagId/:postId/' to={ postUrl }/>
    <Redirect from='blog/:tagId/:postId/page/:pageNumber/' to={ paginate(postUrl) }/>
    <Redirect from='cats/:tagId/' to={ tagUrl }/>
    <Redirect from='dogs/:tagId/' to={ tagUrl }/>
    <Redirect from='cats/:tagId/page/:pageNumber/' to={ paginate(tagUrl) }/>
    <Redirect from='dogs/:tagId/page/:pageNumber/' to={ paginate(tagUrl) }/>

    { /* Main archive */ }
    <IndexRoute component={ Archive }/>
    <Route path={ paginate('') } component={ Archive }/>

    { /* Posts */ }
    <Route path={ postUrl } component={ Single }/>
    <Route path={ paginate(postUrl) } component={ Single }/>

    { /* Archives */ }
    <Route path={ tagUrl } component={ Archive }/>
    <Route path={ paginate(tagUrl) } component={ Archive }/>

    { /* Pages */ }
    <Route path={ pageUrl } component={ Single }/>
    <Route path={ paginate(pageUrl) } component={ Single }/>
  </Route>
)
