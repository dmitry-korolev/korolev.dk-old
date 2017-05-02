import * as React from 'react';
import { times } from 'utils/ramda';
import { Flex } from 'components';

import * as styles from './Pagination.css';

import { PaginationItem } from './PaginationItem';

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
                    isActive={ pageNumber === +currentPage }
                    href={ linkBuilder(pageNumber) }
                />
            );
        }, pageCount);

const Pagination: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    if (!props.pageCount) {
        return null;
    }

    return (
        <Flex
            className={ styles.pagination }
            is='nav'
            j='center'
        >
            { renderItems(props) }
        </Flex>
    );
};

Pagination.displayName = 'Pagination';

export { Pagination };
