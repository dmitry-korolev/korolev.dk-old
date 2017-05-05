import * as cn from 'classnames';
import * as React from 'react';
import { Link } from 'components';

import * as styles from './Pagination.css';

interface IProps extends React.HTMLProps<HTMLElement> {
    pageNumber: number;
    isActive: boolean;
    href: string;
}

const PaginationItem: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    const {
        pageNumber,
        isActive,
        href
    } = props;

    return (
        <span
            className={ cn(styles.pagination_item, {
                [styles.pagination_active]: isActive
            }) }
        >
            <Link
                to={ href }
                unstyled={ true }
            >
                { pageNumber }
            </Link>
        </span>
    );
};

PaginationItem.displayName = 'PaginationItem';

export { PaginationItem };
