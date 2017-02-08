import * as React from 'react';
import { connect } from 'react-redux';
import { Header } from 'components';

// Types
import { IPost } from 'models/content';
import { IStore } from 'models/store';

// const s = require('./style.css');
interface IProps extends React.HTMLProps<HTMLElement> {
    itemId: number;
    isSingle?: boolean;
}

interface IPostProps extends IProps {
    item?: IPost;
}

const renderArticle = (html) => ({ __html: html });

@connect<{}, {}, IProps>(
    ({ posts }: IStore, { itemId }: IProps) => ({
        item: posts.postsById[itemId]
    })
)
export class Post extends React.PureComponent<IPostProps, any> {
    public render() {
        const {
            item: {
                id,
                title: {
                    rendered: title
                },
                content: {
                    rendered: content
                },
                excerpt: {
                    rendered: excerpt
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

            <div
                dangerouslySetInnerHTML={ renderArticle(isSingle ? content : excerpt) }
            />
        </article>;
    }
}
