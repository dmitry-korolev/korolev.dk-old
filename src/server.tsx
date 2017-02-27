import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as debug from 'debug';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';

import { setupApplication } from 'api';
import { Html } from 'containers';
import routes from 'routes';
import { configureStore } from 'state/store';

const manifest = require('../build/manifest.json');
const appConfig = require('../config/main');

// Server stuff
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');

const app = feathers();
const logInfo = debug('k:server:info');
const logError = debug('k:server:error');

app.configure(rest());
app.configure(hooks());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack/dev');
    const webpackCompiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true
    }));

    app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use('/public', feathers.static(path.join(__dirname, 'public')));

setupApplication(app);

app.get('*', (req: any, res: any) => {
    const location = req.url;
    const memoryHistory = createMemoryHistory(req.originalUrl);
    const store = configureStore(memoryHistory as any);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({ history, routes, location },
        (error: Error, redirectLocation: any, renderProps: any) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                const asyncRenderData = Object.assign({}, renderProps, { store });

                loadOnServer(asyncRenderData).then(() => {
                    const markup = ReactDOMServer.renderToString(
                        <Provider store={ store } key='provider'>
                            <ReduxAsyncConnect { ...renderProps } />
                        </Provider>
                    );
                    res.status(200).send(renderHTML(markup, store));
                });
            } else {
                res.status(404).send('Not Found?');
            }
        });
});

app.listen(appConfig.port, appConfig.host, (err: Error): void => {
    if (err) {
        logError(err);
    } else {
        logInfo(`\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`);
    }
});

function renderHTML(markup: string, store: any): string {
    const html = ReactDOMServer.renderToString(
        <Html markup={ markup } manifest={ manifest } store={ store } />
    );

    return `<!doctype html> ${html}`;
}
