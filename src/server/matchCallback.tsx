import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import { Html } from 'containers'
import { app } from 'services/api'
const manifest = require('../../build/manifest.json')
import { HTTP_STATUS } from './httpStatuses'

export const matchCallback =
  (res: any, store: any): any =>
    async (error: Error, redirectLocation: any, renderProps: any): Promise<void> => {
      if (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error.message)
      } else if (redirectLocation) {
        res.redirect(HTTP_STATUS.MOVED_PERMANENTLY, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        let status = HTTP_STATUS.OK

        if (renderProps.params.pageId) {
          const service = app.service(`api/pages`)
          try {
            const page = await service.get(renderProps.params.pageId)
            if (!page) {
              status = HTTP_STATUS.NOT_FOUND
            }
          } catch (err) {
            status = HTTP_STATUS.NOT_FOUND
          }
        }

        const asyncRenderData = Object.assign({}, renderProps, { store })

        await loadOnServer(asyncRenderData)
        const markup = ReactDOMServer.renderToString((
          <Provider store={ store } key='provider'>
            <ReduxAsyncConnect { ...renderProps } />
          </Provider>
        ))
        res.status(status).send(renderHTML(markup, store))
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send('Not Found?')
      }
    }

function renderHTML (markup: string, store: any): string {
  const html = ReactDOMServer.renderToString(
    <Html markup={ markup } manifest={ manifest } store={ store }/>
  )

  return `<!doctype html> ${html}`
}
