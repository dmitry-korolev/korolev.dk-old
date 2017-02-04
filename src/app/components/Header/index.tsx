import * as React from 'react';
import * as classNames from 'classnames';

import { Title, Link } from '../../components';

const s = require('./style.css');

interface IProps extends React.HTMLProps<HTMLElement> {
    titleText: string;
    titleLink: string;
    subtitle?: string;
    mod?: 'site' | 'post';
}

const getTitleTag = (mod) => ({
    site: 'h1',
    post: 'h2'
}[mod]);

const getTitleClass = (mod) => ({
    site: s.header__title_site,
    post: s.header__title_post
}[mod]);

export const Header: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        titleText,
        titleLink,
        subtitle,
        mod = 'post'
    } = props;

    return <div
        className={ s.header }
    >
        <Title
            tag={ getTitleTag(mod) }
            className={ classNames({
                [s.header__title]: true,
                [getTitleClass(mod)]: true
            }) }
        >
            <Link to={ titleLink } unstyled>
                { titleText }
            </Link>
        </Title>
        { subtitle && <Title
            tag='h3'
            className={ s.header__subtitle }
        >
            { subtitle }
        </Title> }
    </div>;
};
