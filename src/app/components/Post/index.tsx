import * as React from 'react';
import { Header } from 'components';
import { IPost } from 'models/post';

// const s = require('./style.css');

interface IProps extends React.HTMLProps<HTMLElement> {
    item: IPost;
    isMainPage: boolean;
}

export const Post: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        id,
        title: {
            rendered: title
        },
        content: {
            rendered: content
        },
        slug
    } = props.item;
    const renderArticle = (html) => ({ __html: html });

    return <article
        id={ `post-${id}` }
    >
        <Header
            titleText={ title }
            titleLink={ `/${slug}/` }
        />

        <div
            dangerouslySetInnerHTML={ renderArticle(content) }
        />
    </article>;
};
