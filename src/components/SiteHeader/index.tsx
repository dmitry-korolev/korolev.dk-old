import { Box, Flex, Header, Link } from 'components';
import * as React from 'react';

const s = require('./style.css');

interface IProps {
    headline: string;
}

const SiteHeader: React.StatelessComponent<IProps> = ({ headline }: IProps): JSX.Element => <Flex
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

SiteHeader.displayName = 'SiteHeader';

export { SiteHeader };