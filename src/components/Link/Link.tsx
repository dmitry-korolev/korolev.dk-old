import * as cn from 'classnames';
import * as React from 'react';
import { IndexLink, Link as RouterLink, LinkProps } from 'react-router';

import * as s from './Link.css';

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
            activeClassName={ s.link_active }
            className={ cn({
                [className]: !!className,
                [s.link]: true,
                [s.link_unstyled]: unstyled
            }) }
            { ...linkProps }
        >
            { children }
        </Component>
    );
};

Link.displayName = 'Link';

export { Link };
