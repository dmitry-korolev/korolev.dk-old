import * as React from 'react'
import { Text } from 'components'

import * as styles from './NotFound.css'

const NotFound: React.StatelessComponent<React.HTMLProps<HTMLElement>> = (): JSX.Element => {
  return (
    <article>
      <div className={ styles.notFound }>
        <img src={ require('./404.jpg') }/>
        <Text
          tag={ 'strong' }
          className={ styles.notFound__404 }
        >404</Text>
      </div>
      <Text>
        К сожалению, по этому адресу ничего нет. Попробуйте поиск.
      </Text>
    </article>
  )
}

export { NotFound }
