import * as e6p from 'es6-promise'
(e6p as any).polyfill()
import 'isomorphic-fetch'

import * as debug from 'debug'
import { createMemoryHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { setupApplication } from 'api'
import routes from 'routes/Routes'
import { matchCallback } from 'server/matchCallback'
import { configureStore } from 'state/store'

const appConfig = require('../config/main')

import { app } from 'services/api'

// Server stuff
const feathers = require('feathers')
const rest = require('feathers-rest')
const hooks = require('feathers-hooks')
const bodyParser = require('body-parser')
const errorsHandler = require('feathers-errors/handler')
const path = require('path')
const compression = require('compression')
const favicon = require('serve-favicon')

const logInfo = debug('k:server:info')
const logError = debug('k:server:error')

console.log = debug('k:server:console:info')
console.error = debug('k:server:console:error')

app.configure(rest())
app.configure(hooks())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('../config/webpack/dev')
  const webpackCompiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true
  }))

  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use('/public', feathers.static(path.join(__dirname, 'public')))

setupApplication(app)

// Some services do not use it, so pass it directly
app.use(errorsHandler())

app.get('*', (req: any, res: any) => {
  const location = req.url
  const memoryHistory = createMemoryHistory(req.originalUrl)
  const store = configureStore(memoryHistory as any)
  const history: any = syncHistoryWithStore(memoryHistory as any, store)

  match(
    { history, routes, location },
    matchCallback(res, store)
  )
})

app.listen(appConfig.port, appConfig.host, (err: Error): void => {
  if (err) {
    logError(err)
  } else {
    logInfo(`\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`)
  }
})

process.on('unhandledRejection', (reason: Error): void => {
  logError(reason)
  process.exit(1)
})
