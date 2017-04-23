import { Link } from 'components';
import * as React from 'react';
import { postUrlTemplate, tagUrlTemplate } from 'utils';
import { dateFormat } from 'utils';

// Types
import { IPost } from 'models/posts';
import { ITag } from 'models/tags';
import { IFormatterOptions } from 'utils/dateFormat';

import * as styles from './style.css';

interface IProps {
    post: IPost;
    tags?: ITag[];
}

const formatCreatedDate = dateFormat(({ YYYY, MM, DD }: IFormatterOptions): string => `${YYYY}/${MM}/${DD}`);

export const PostFooter = ({ post, tags = [] }: IProps): JSX.Element => {
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
            <ul>
                <li>
                    <Link to={ postUrl } >
                        <time dateTime={ _created }>
                            { formatCreatedDate(_created) }
                        </time>
                        { _updated ? <time
                            className={ styles.footer_updated }
                            dateTime={ _updated }
                        /> : null }
                    </Link>
                </li>
                {
                    tags.map((tag: ITag): JSX.Element => {
                        const { _id: tagId, title } = tag;

                        return <li
                            key={ tagId }
                        >
                            <Link to={ tagUrlTemplate(tagId) } rel='tag'>{ title }</Link>
                        </li>;
                    })
                }
            </ul>
        </footer>
    );
};
