import * as React from 'react'
import * as cn from 'classnames'

import * as styles from './List.css'

interface IListProps extends React.HTMLProps<HTMLOListElement> {
  ordered?: boolean
  start?: number
  type?: string
}

const getStyle = (type) => (type ? {
  listStyleType: type
} : null)

const List: React.StatelessComponent<IListProps> = (props) => {
  const { ordered, start, type, children } = props
  const Tag = ordered ? 'ol' : 'ul'

  return <Tag
    start={ start }
    className={ cn(styles.list) }
    style={ getStyle(type) }
  >
    { children }
  </Tag>
}

export { List }
