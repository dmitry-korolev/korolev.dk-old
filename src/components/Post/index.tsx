import { Header } from 'components';
import * as React from 'react';
import { connect } from 'react-redux';
// import { postUrlTemplate } from 'utils';
import { getPostFromState } from 'utils';

// Types
import { IPost, ITag } from 'models/content';
import { IStore } from 'models/store';

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

const renderArticle = (html: string): JSX.Element => (
    <div
        dangerouslySetInnerHTML={ { __html: html } }
    />
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

                { renderArticle(isSingle ? content : excerpt ) }
            </article>
        );
    }
}
