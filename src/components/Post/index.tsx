import { Header } from 'components';
import * as React from 'react';
import { connect } from 'react-redux';

const curry = require('ramda/src/curry');
const pipe = require('ramda/src/pipe');

// Types
import { IPost } from 'models/content';
import { IStore } from 'models/store';

// const s = require('./style.css');
interface IProps extends React.HTMLProps<HTMLElement> {
    itemId: number;
    isSingle?: boolean;
}

interface IPostProps {
    item?: IPost;
}

type CombinedProps = IProps & IPostProps;

const renderArticle = (html: string): JSX.Element => <div
    dangerouslySetInnerHTML={ { __html: html } }
/>;
const getPart = curry((mode: string, html: string): string => {
    if (mode === 'full') {
        return html;
    }

    return (html || '').split('<p><!--more--></p>')[0];
});

const mapStateToProps = ({ posts }: IStore, { itemId }: IProps): IPostProps => ({
    item: posts.postsById[itemId]
});

@connect<{}, {}, IProps>(mapStateToProps)
export class Post extends React.PureComponent<CombinedProps, any> {
    public render(): JSX.Element | null {
        const {
            item: {
                id,
                content: {
                    rendered: content
                },
                title: {
                    rendered: title
                },
                slug
            },
            isSingle
        } = this.props;

        return <article
            id={ `post-${id}` }
        >
            <Header
                titleText={ title }
                titleLink={ `/${slug}/` }
                titleTag={ isSingle ? 'h1' : 'h2' }
            />

            {
                pipe(
                    getPart(isSingle ? 'full' : 'excerpt'),
                    renderArticle
                )(content)
            }
        </article>;
    }
}
