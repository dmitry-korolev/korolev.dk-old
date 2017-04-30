import * as React from 'react';
import * as cn from 'classnames';

import * as styles from './Title.css';

export type TitleSize = 32 | 24 | 20 | 16 | 10 | 8;

interface IProps extends React.HTMLProps<HTMLElement> {
    big?: boolean;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: TitleSize;
}

const levels = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
};

const Title: React.StatelessComponent<IProps> = ({
    level = 2,
    className,
    size,
    children,
    ...htmlProps
}: IProps): JSX.Element => {
    const Component = levels[level];

    return (
        <Component
            className={ cn(className, styles.title, styles[`size_${size}`]) }
            { ...htmlProps }
        >
            { children }
        </Component>
    );
};

Title.displayName = 'Title';

export { Title };
