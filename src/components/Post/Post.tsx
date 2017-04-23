import { Header } from 'components';
import * as React from 'react';
import { connect } from 'react-redux';
import { postUrlTemplate } from 'utils';
import { getPostFromState, makeExcerpt } from 'utils';
import { pipe } from 'utils/ramda';

// Types
import { IPost } from 'models/posts';
import { ITag } from 'models/tags';
import { IStore } from 'models/store';

import { PostFooter } from './PostFooter';
import * as style from './Post.css';

interface IProps extends React.HTMLProps<HTMLElement> {
    itemId: string;
    isSingle?: boolean;
}

interface IPostProps {
    post: IPost;
    tags?: ITag[];
}

type CombinedProps = IProps & IPostProps;

const insertHtml = (html: string): JSX.Element => (
    <div
        className={ style.post_content }
        dangerouslySetInnerHTML={ { __html: html } }
    />
);

const getContent = (content: string, excerpt: string, isSingle: boolean): string => {
    if (isSingle) {
        return content;
    }

    return excerpt || makeExcerpt(content);
};

const renderArticle: (content: string, excerpt: string, isSingle: boolean) => JSX.Element = pipe(
    getContent,
    insertHtml
);

const mapStateToProps =
    (state: IStore, { itemId }: IProps): IPostProps =>
        getPostFromState(state, itemId);

export const Post = connect(mapStateToProps)(({ post, tags, isSingle, className }: CombinedProps): JSX.Element => {
    if (!post) {
        return null;
    }

    const {
        _id,
        content,
        excerpt,
        title,
        subtitle
    } = post;

    const postUrl = postUrlTemplate(_id);

    return (
        <article
            id={ `post-${_id}` }
            className={ className }
        >
            <header
                className={ style.post_header }
            >
                <Header
                    titleText={ title }
                    titleLink={ postUrl }
                    titleTag={ isSingle ? 'h1' : 'h2' }
                    subtitle={ subtitle }
                />
            </header>

            { renderArticle(content, excerpt, isSingle) }

            <PostFooter
                className={ style.post_footer }
                post={ post }
                tags={ tags }
            />
        </article>
    );
});
