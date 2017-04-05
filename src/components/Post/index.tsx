import { Header } from 'components';
import * as React from 'react';
import { connect } from 'react-redux';
// import { postUrlTemplate } from 'utils';
import { getPostFromState, makeExcerpt } from 'utils';

// Types
import { IPost, ITag } from 'models/content';
import { IStore } from 'models/store';

const pipe = require('ramda/src/pipe');

// const s = require('./style.css');
interface IProps extends React.HTMLProps<HTMLElement> {
    itemId: number;
    isSingle?: boolean;
}

interface IPostProps {
    post?: IPost;
    tags?: ITag[];
}

type CombinedProps = IProps & IPostProps;

const insertHtml = (html: string): JSX.Element => (
    <div
        dangerouslySetInnerHTML={ { __html: html } }
    />
);

const getContent = (content: string, excerpt: string, isSingle: boolean): string => {
    if (!isSingle) {
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

@connect<{}, {}, IProps>(mapStateToProps)
export class Post extends React.PureComponent<CombinedProps, any> {
    public render(): JSX.Element | null {
        if (!this.props.post) {
            return null;
        }

        const {
            post: {
                _id,
                content,
                excerpt,
                title
            },
            isSingle
        } = this.props;

        return (
            <article
                id={ `post-${_id}` }
            >
                <Header
                    titleText={ title }
                    titleLink={ _id }
                    titleTag={ isSingle ? 'h1' : 'h2' }
                />

                { renderArticle(content, excerpt, isSingle) }
            </article>
        );
    }
}
