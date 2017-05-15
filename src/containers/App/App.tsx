import * as React from 'react'
import * as Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { path } from 'utils/ramda'

import { SiteHeader, SiteFooter } from 'components'
import { runGlobalActions } from 'state/globalActions'
import { getHeadlines, headlinesSet } from 'state/headlines'
import { getTags } from 'state/tags'

// Models
import { IApplication } from 'models/appication'
import { IConnectArguments, IStore } from 'models/store'

// Styles
import * as styles from './App.css'

interface IProps extends React.HTMLProps<HTMLDivElement> {
  headline: string
  application: IApplication
  isMainPage: boolean
}

const headlinePath = path(['current', 'content'])
const mapState = ({
                    headlines,
                    application
                  }: IStore): IProps => ({
                    headline: headlinePath(headlines),
                    application,
                    isMainPage: application.location.pathname === '/'
                  })

const aConnect = asyncConnect(
  [{
    promise: ({ store: { dispatch } }: IConnectArguments): Promise<void> => runGlobalActions(
      dispatch,
      [
        getHeadlines,
        getTags
      ],
      [
        headlinesSet
      ]
    )

  }],
  mapState
)

const App = aConnect((props: IProps): JSX.Element => {
  const {
    headline,
    children,
    isMainPage,
    application: {
      title,
      titleTemplate,
      head: {
        meta,
        link
      }
    }
  } = props

  return (
    <div className={ styles.appContainer }>
      <Helmet
        title={ title }
        titleTemplate={ titleTemplate }
        meta={ meta }
        link={ link }
      />
      <SiteHeader
        isMainPage={ isMainPage }
        headline={ headline }
      />
      { children }
      <SiteFooter />
    </div>
  )
})

App.displayName = 'App'

export { App }
