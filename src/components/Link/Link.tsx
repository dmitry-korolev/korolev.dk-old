import * as cn from 'classnames'
import * as React from 'react'
import { IndexLink, Link as RouterLink, IndexLinkProps } from 'react-router'

import * as styles from './Link.css'

interface IProps extends IndexLinkProps {
  to: string
  unstyled?: boolean
  isHome?: boolean
}

const Link: React.StatelessComponent<IProps> = (props: IProps): JSX.Element => {
  const {
    unstyled,
    children,
    isHome,
    className,
    to,
    ...htmlProps
  } = props

  const Component = isHome ? IndexLink : RouterLink

  return (
    <Component
      activeClassName={ styles.link_active }
      className={ cn(styles.link, className, {
        [styles.link_unstyled]: unstyled
      }) }
      to={ to }
      { ...htmlProps }
    >
      { children }
    </Component>
  )
}

Link.displayName = 'Link'

export { Link }
