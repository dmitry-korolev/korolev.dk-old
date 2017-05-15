import { Header, NotFound } from 'components'
import * as React from 'react'
import { connect } from 'react-redux'
import { postUrlTemplate } from 'utils'
import { getPostFromState, getPageFromState, makeExcerpt } from 'utils'
import { pipe } from 'utils/ramda'

// Types
import { IPost } from 'models/posts'
import { IPage } from 'models/pages'
import { ITag } from 'models/tags'
import { IStore } from 'models/store'

import { PostFooter } from './PostFooter'
import * as style from './Post.css'

interface IProps extends React.HTMLProps<HTMLElement> {
  itemId: string
  isSingle?: boolean
  mod: 'post' | 'page'
}

interface IPostProps {
  item: IPost | IPage
  tags?: ITag[]
}

type CombinedProps = IProps & IPostProps

// TODO: move this to settings db
const MAX_EXCERPT_LENGTH = 300

const insertHtml = (html: string): JSX.Element => (
  <div
    className={ style.post_content }
    dangerouslySetInnerHTML={ { __html: html } }
  />
)

const makeExcerptN = makeExcerpt(MAX_EXCERPT_LENGTH)

const getContent = (content: string, excerpt: string, isSingle: boolean): string => {
  if (isSingle) {
    return content
  }

  return excerpt || makeExcerptN(content)
}

const renderArticle: (content: string, excerpt: string, isSingle: boolean) => JSX.Element = pipe(
  getContent,
  insertHtml
)

const getItem = {
  post: getPostFromState,
  page: getPageFromState
}

const mapStateToProps =
  (state: IStore, { itemId, mod }: IProps): IPostProps =>
    getItem[mod](state, itemId)

const Post = connect(mapStateToProps)(({ item, tags, mod, isSingle, className }: CombinedProps): JSX.Element => {
  if (!item._id) {
    return <NotFound />
  }

  const {
    _id,
    content,
    excerpt,
    title,
    subtitle
  } = item as IPost

  const postUrl = postUrlTemplate(_id)

  return (
    <article
      id={ _id }
      className={ className }
    >
      <header
        className={ style.post_header }
      >
        <Header
          titleText={ title }
          titleLink={ postUrl }
          titleLevel={ isSingle ? 1 : 2 }
          titleSize={ 28 }
          subtitle={ subtitle }
        />
      </header>

      { renderArticle(content, excerpt, isSingle) }

      <PostFooter
        className={ style.post_footer }
        item={ item }
        tags={ tags }
        mod={ mod }
      />
    </article>
  )
})

Post.displayName = 'Post'

export { Post }
