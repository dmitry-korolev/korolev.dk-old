import * as React from 'react';
import * as cn from 'classnames';

import * as styles from './Text.css';

export type TextSize = 8 | 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32;

export interface ITextProps extends React.HTMLProps<HTMLElement> {
    tag?: string;
    size?: TextSize;
}

const Text: React.StatelessComponent<ITextProps> = ({
    tag: Component = 'div',
    className,
    size,
    children,
    ...htmlProps
}: ITextProps): JSX.Element => (
    <Component
        className={ cn(className, {
            [styles[`size_${size}`]]: !!size
        }) }
        { ...htmlProps }
    >
        { children }
    </Component>
);

Text.displayName = 'Text';

export { Text };
