import * as React from 'react'
import { Flex, Link } from 'components'

const year = String((new Date()).getUTCFullYear())

const SiteFooter: React.StatelessComponent<{}> = (): JSX.Element => (
  <Flex
    is='footer'
    j='space-between'
    className='site-footer'
  >
    <div className='site-info'>
      2008-
      <time dateTime={ year }>{ year }</time>
      © <Link to='/about/'>Дмитрий Королев</Link>
    </div>
    <div className='footer-menu'>
      <ul id='menu-menyu-v-podvale' className='menu plain-list'>
        <li id='menu-item-4911' className=''>
          <a href='http://mustdigital.ru'>MUSTdigital</a>
        </li>
        <li id='menu-item-5096' className=''>
          <a href='https://agenius.ru/storehouse/'>Овощебаза</a>
        </li>
      </ul>
    </div>
  </Flex>
)

SiteFooter.displayName = 'SiteFooter'

export {
  SiteFooter
}
