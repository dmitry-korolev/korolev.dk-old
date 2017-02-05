import * as React from 'react';
import { Header } from 'components';
import { IPost } from 'models/content';

// const s = require('./style.css');

interface IProps extends React.HTMLProps<HTMLElement> {
    item: IPost;
    isSingle: boolean;
}

const renderArticle = (html) => ({ __html: html });

export const Post: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        item: {
            id,
            title: {
                rendered: title
            },
            content: {
                rendered: content
            },
            slug
        },
        isSingle
    } = props;

    return <article
        id={ `post-${id}` }
    >
        <Header
            titleText={ title }
            titleLink={ `/${slug}/` }
            titleTag={ isSingle ? 'h1' : 'h2' }
        />

        <div
            dangerouslySetInnerHTML={ renderArticle(content) }
        />
    </article>;
};
