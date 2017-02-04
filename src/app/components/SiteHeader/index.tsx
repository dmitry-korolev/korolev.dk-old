import * as React from 'react';
import { Header, Link, Flex, Box } from '../../components';

const s = require('./style.css');

interface IProps {
    headline: string;
}

export const SiteHeader: React.StatelessComponent<IProps> = ({ headline }: IProps) => <Flex
    is='header'
    className={ s.site_header }
    ai='center'
>
    <Box
        className={ s.site_logo }
    >
        <Link to='/' unstyled>
            <img src={ require('./logo.png') } />
        </Link>
    </Box>
    <Box>
        <Header
            titleLink='/'
            titleText='Пингвин Рыба Есть'
            subtitle={ headline }
            mod='site'
        />
    </Box>
</Flex>;
