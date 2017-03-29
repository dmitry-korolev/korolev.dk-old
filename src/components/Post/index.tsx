import { Header } from 'components';
import * as React from 'react';
import { connect } from 'react-redux';
// import { postUrlTemplate } from 'utils';
import { getPostFromState } from 'utils';

const curry = require('ramda/src/curry');
const pipe = require('ramda/src/pipe');

// Types
import { IPost, ITag } from 'models/content';
import { IStore } from 'models/store';

// const s = require('./style.css');
interface IProps extends React.HTMLProps<HTMLElement> {
    itemId: number;
    isSingle?: boolean;
}

interface IPostProps {
    item?: IPost;
    tags?: ITag[];
}

type CombinedProps = IProps & IPostProps;

const renderArticle = (html: string): JSX.Element => (
    <div
        dangerouslySetInnerHTML={ { __html: html } }
    />
);
const getPart = curry((mode: string, html: string): string => {
    if (mode === 'full') {
        return html;
    }

    return (html || '').split('<p><!--more--></p>')[0];
});

const mapStateToProps =
    (state: IStore, { itemId }: IProps): IPostProps =>
        getPostFromState(state, itemId);

@connect<{}, {}, IProps>(mapStateToProps)
export class Post extends React.PureComponent<CombinedProps, any> {
    public render(): JSX.Element | null {
        if (!this.props.item) {
            return null;
        }

        const {
            item: {
                _id,
                content,
                title,
                slug
            },
            isSingle
        } = this.props;

        return (
            <article
                id={ `post-${_id}` }
            >
                <Header
                    titleText={ title }
                    titleLink={ slug }
                    titleTag={ isSingle ? 'h1' : 'h2' }
                />

                {
                    pipe(
                        getPart(isSingle ? 'full' : 'excerpt'),
                        renderArticle
                    )(content)
                }
            </article>
        );
    }
}
