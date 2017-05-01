import * as React from 'react';
import * as cn from 'classnames';

import { Link } from 'components';
import { postUrlTemplate, tagUrlTemplate } from 'utils';
import { dateFormat } from 'utils';

// Types
import { IPost } from 'models/posts';
import { ITag } from 'models/tags';

import * as styles from './PostFooter.css';

interface IProps extends React.HTMLProps<any> {
    post: IPost;
    tags?: ITag[];
}

const formatCreatedDate = dateFormat('YYYY/MM/DD');
const isofyDate = (date: string): string => (new Date(date)).toISOString();

const PostFooter: React.StatelessComponent<IProps> = ({ post, tags = [], className }: IProps): JSX.Element => {
    if (!post) {
        return null;
    }

    const {
        _id,
        _created,
        _updated
    } = post;

    const postUrl = postUrlTemplate(_id);

    return (
        <footer>
            <nav className={ cn(className, styles.footer) }>
                <Link
                    to={ postUrl }
                    className={ styles.footer_item }
                >
                    <time dateTime={ isofyDate(_created) }>
                        { formatCreatedDate(_created) }
                    </time>
                    { _updated ? <time
                        className={ styles.footer_updated }
                        dateTime={ isofyDate(_updated) }
                    /> : null }
                </Link>
                { tags.length ? tags.map((tag: ITag): JSX.Element => {
                    const { _id: tagId, title } = tag;

                    return <Link
                        key={ tagId }
                        to={ tagUrlTemplate(tagId) }
                        rel='tag'
                        className={ styles.footer_item }
                    >
                        { title }
                    </Link>;
                }) : null }
            </nav>
        </footer>
    );
};

PostFooter.displayName = 'PostFooter';

export { PostFooter }
