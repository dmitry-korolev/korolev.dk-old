import * as React from 'react';
import * as cn from 'classnames';
import { Link as RouterLink, IndexLink, LinkProps } from 'react-router';

const s = require('./style.css');

interface IProps extends LinkProps {
    to: string;
    unstyled?: boolean;
    isHome?: boolean;
}

const Link: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        unstyled,
        children,
        isHome,
        ...linkProps
    } = props;

    const Component = isHome ? IndexLink : RouterLink;

    return <Component
        activeClassName={ s.link_active }
        className={ cn({
            [s.link]: true,
            [s.link_unstyled]: unstyled
        }) }
        { ...linkProps }
    >
        { children }
    </Component>;
};

Link.displayName = 'Link';

export { Link };
