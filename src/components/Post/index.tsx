import { Header, Link } from 'components';
import * as React from 'react';
import { connect } from 'react-redux';
import { postUrlTemplate } from 'utils';
import { getPostFromState, makeExcerpt, dateFormat } from 'utils';
import { pipe } from 'utils/ramda';

// Types
import { IPost } from 'models/posts';
import { ITag } from 'models/tags';
import { IStore } from 'models/store';
import { IFormatterOptions } from 'utils/dateFormat';

import * as styles from './style.css';

interface IProps extends React.HTMLProps<HTMLElement> {
    itemId: string;
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

const formatCreatedDate = dateFormat(({ YYYY, MM, DD }: IFormatterOptions): string => `${YYYY}/${MM}/${DD}`);

@connect<{}, {}, IProps>(mapStateToProps)
export class Post extends React.PureComponent<CombinedProps, any> {
    public render(): JSX.Element | null {
        if (!this.props.post) {
            return null;
        }

        const {
            post: {
                _id,
                _created,
                _updated,
                content,
                excerpt,
                title,
                subtitle
            },
            isSingle
        } = this.props;

        const postUrl = postUrlTemplate(_id);

        return (
            <article
                id={ `post-${_id}` }
            >
                <header>
                    <Header
                        titleText={ title }
                        titleLink={ postUrl }
                        titleTag={ isSingle ? 'h1' : 'h2' }
                        subtitle={ subtitle }
                    />
                </header>

                { renderArticle(content, excerpt, isSingle) }

                <footer>
                    <ul>
                        <li>
                            <Link to={ postUrl } >
                                <time dateTime={ _created }>
                                    { formatCreatedDate(_created) }
                                </time>
                                { _updated ? <time
                                    className={ styles.footer_updated }
                                    dateTime='2015-12-14T19:23:18+00:00'
                                >
                                    14.12.2015
                                </time> : null }
                            </Link>
                        </li>
                        <li>
                            <a href='https://agenius.ru/cats/code/' rel='category tag'>Code</a>
                        </li>
                        <li>
                            <a href='https://agenius.ru/dogs/js/' rel='tag'>JS</a>,
                            <a href='https://agenius.ru/dogs/less/' rel='tag'>LESS</a>
                        </li>
                        <li>
                            <a href='https://agenius.ru/blog/code/5331/#comments'>1 комментарий</a>
                        </li>
                    </ul>
                </footer>
            </article>
        );
    }
}
