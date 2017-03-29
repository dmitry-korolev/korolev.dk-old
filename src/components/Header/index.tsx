import * as cn from 'classnames';
import * as React from 'react';

import { Link, Title } from 'components';

const s = require('./style.css');

interface IProps extends React.HTMLProps<HTMLElement> {
    titleText: string;
    titleLink: string;
    titleTag?: 'h1' | 'h2' | 'h3';
    subtitle?: string;
    mod?: 'site' | 'post';
}

const getTitleClass = (mod: string): string => ({
    site: s.header__title_site,
    post: s.header__title_post
}[mod]);

const Header: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
    const {
        titleText,
        titleLink,
        titleTag = 'h2',
        subtitle,
        mod = 'post'
    } = props;

    return (
        <div
            className={ s.header }
        >
            <Title
                tag={ titleTag }
                className={ cn({
                    [s.header__title]: true,
                    [getTitleClass(mod)]: true
                }) }
            >
                <Link to={ titleLink } unstyled={ true }>
                    { titleText }
                </Link>
            </Title>
            { subtitle && (
                <Title
                    tag='h3'
                    className={ s.header__subtitle }
                >
                    { subtitle }
                </Title>
            ) }
        </div>
    );
};

Header.displayName = 'Header';

export { Header };
