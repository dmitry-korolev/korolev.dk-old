import * as React from 'react';
import * as cn from 'classnames';
import { Text } from 'components';

import * as styles from './Title.css';

// Models
import { TextSize } from 'components/Text/Text';

interface IProps extends React.HTMLProps<HTMLElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: TextSize;
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
    children,
    ...htmlProps
}: IProps): JSX.Element => {
    const tag = levels[level];

    return (
        <Text
            tag={ tag }
            className={ cn(className, styles.title) }
            { ...htmlProps }
        >
            { children }
        </Text>
    );
};

Title.displayName = 'Title';

export { Title };
