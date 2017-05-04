import * as cn from 'classnames';
import * as React from 'react';
import { Link } from 'components';
import { scrollTo } from 'utils';

import * as styles from './Pagination.css';

interface IProps extends React.HTMLProps<HTMLElement> {
    pageNumber: number;
    isActive: boolean;
    href: string;
}

const scrollToTop = (): void => scrollTo(0);

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
                onClick= { scrollToTop }
            >
                { pageNumber }
            </Link>
        </span>
    );
};

PaginationItem.displayName = 'PaginationItem';

export { PaginationItem };
