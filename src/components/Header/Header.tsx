import * as React from 'react'

import { Link, Title } from 'components'

import * as styles from './Header.css'

import { TextSize } from 'components/Text/Text'

interface IProps extends React.HTMLProps<HTMLElement> {
  titleText: string
  titleLink: string
  titleLevel: 1 | 2 | 3
  titleSize: TextSize
  subtitle?: string
}

const Header: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
  const {
    titleText,
    titleLink,
    titleLevel,
    titleSize,
    subtitle
  } = props

  return (
    <div
      className={ styles.header }
    >
      <Title
        level={ titleLevel }
        size={ titleSize }
        className={ styles.header__title }
      >
        <Link to={ titleLink } unstyled={ true }>
          { titleText }
        </Link>
      </Title>
      { subtitle && (
        <Title
          level={ 3 }
          size={ 18 }
        >
          { subtitle }
        </Title>
      ) }
    </div>
  )
}

Header.displayName = 'Header'

export { Header }
