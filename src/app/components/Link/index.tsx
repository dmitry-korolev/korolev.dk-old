import * as React from 'react';
import * as classNames from 'classnames';
import { Link as RouterLink, IndexLink } from 'react-router';

const s = require('./style.css');

interface IProps extends RouterLink.LinkProps {
    to: string;
    unstyled?: boolean;
    isHome?: boolean;
}

export const Link: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        unstyled,
        children,
        isHome,
        ...linkProps
    } = props;

    const Component = isHome ? IndexLink : RouterLink;

    return <Component
        activeClassName={ s.link_active }
        className={ classNames({
            [s.link]: true,
            [s.link_unstyled]: unstyled
        }) }
        { ...linkProps }
    >
        { children }
    </Component>;
};
