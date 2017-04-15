import * as React from 'react';
import { times } from 'utils/ramda';

import { PaginationItem } from './PaginationItem';
import * as styles from './Pagination.css';

interface IProps extends React.HTMLProps<HTMLElement> {
    pageCount: number;
    currentPage: number;
    linkBuilder(pageNumber: number): string;
}

const renderItems =
    ({ pageCount, currentPage, linkBuilder }: IProps): JSX.Element[] =>
        times((index: number): JSX.Element => {
            const pageNumber = index + 1;

            return (
                <PaginationItem
                    key={ pageNumber }
                    pageNumber={ pageNumber }
                    isActive={ pageNumber === currentPage }
                    href={ linkBuilder(pageNumber) }
                />
            );
        }, pageCount);

const Pagination: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    if (!props.pageCount) {
        return null;
    }

    return (
        <nav className={ styles.pagination }>
            { renderItems(props) }
        </nav>
    );
};

Pagination.displayName = 'Pagination';

export { Pagination };
