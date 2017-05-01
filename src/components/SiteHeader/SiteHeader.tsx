import { Box, Flex, Header, Link } from 'components';
import * as React from 'react';

import * as s from './SiteHeader.css';

interface IProps {
    isMainPage: boolean;
    headline: string;
}

const SiteHeader: React.StatelessComponent<IProps> = ({ headline, isMainPage }: IProps): JSX.Element => (
    <Flex
        is='div'
        className={ s.site_header }
        ai='center'
    >
        <Box
            className={ s.site_logo }
        >
            <Link to='/' unstyled={ true }>
                <img src={ require('./logo.png') } />
            </Link>
        </Box>
        <Box>
            <Header
                titleLink='/'
                titleText='Пингвин Рыба Есть'
                subtitle={ headline }
                titleLevel={ isMainPage ? 1 : 2 }
                titleSize={ 28 }
            />
        </Box>
    </Flex>
);

SiteHeader.displayName = 'SiteHeader';

export { SiteHeader };
