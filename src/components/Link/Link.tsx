import * as cn from 'classnames';
import * as React from 'react';
import { IndexLink, Link as RouterLink, LinkProps } from 'react-router';

import * as styles from './Link.css';

interface IProps extends LinkProps {
    to: string;
    unstyled?: boolean;
    isHome?: boolean;
}

const Link: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    const {
        unstyled,
        children,
        isHome,
        className,
        ...linkProps
    } = props;

    const Component = isHome ? IndexLink : RouterLink;

    return (
        <Component
            activeClassName={ styles.link_active }
            className={ cn(styles.link, className, {
                [styles.link_unstyled]: unstyled
            }) }
            { ...linkProps }
        >
            { children }
        </Component>
    );
};

Link.displayName = 'Link';

export { Link };
