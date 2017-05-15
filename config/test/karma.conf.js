const path = require('path')
const webpack = require('webpack')
const postcssImport = require('postcss-import')
const postcssAssets = require('postcss-assets')
const postcssNext = require('postcss-cssnext')
const appConfig = require('../main')

module.exports = function (config) {
  const conf = {
    frameworks: ['mocha', 'chai', 'es6-shim'],

    browsers: ['PhantomJS'],

    files: ['../webpack/test.js'],

    preprocessors: {
      '../src/**/*.ts': ['coverage'],
      '../src/**/*.tsx': ['coverage'],
      '../webpack/test.js': ['webpack']
    },

    plugins: ['karma-*'],

    reporters: ['mocha', 'coverage'],

    captureConsole: true,

    coverageReporter: {
      dir: '../../coverage',
      reporters: []
    },

    hostname: appConfig.host,

    port: appConfig.karmaPort,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    concurrency: Infinity,

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        modules: [
          path.resolve(__dirname),
          '../../src',
          '../../src/state',
          'node_modules'
        ],
        extensions: ['.json', '.js', '.ts', '.tsx', '.jsx']
      },

      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'babel-loader!awesome-typescript-loader?useCache=false'
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.css$/,
            include: path.resolve('./src'),
            use: [
              {loader: 'style-loader'},
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 2,
                  localIdentName: 'c_[hash:base64:6]'
                }
              },
              {loader: 'postcss-loader'}
            ]
          },
          {
            test: /\.css$/,
            exclude: path.resolve('./src'),
            loaders: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            enforce: 'post',
            test: /\.tsx?$/,
            loader: 'istanbul-instrumenter-loader',
            include: path.resolve('./src')
          }
        ]
      },

      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },

      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: function () {
              return [
                postcssImport(),
                postcssNext(),
                postcssAssets({
                  relative: true
                })
              ]
            }
          }
        }),
        new webpack.IgnorePlugin(/^fs$/),
        new webpack.IgnorePlugin(/^react\/addons$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('development')
          }
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }
  }

  if (process.env.NODE_ENV === 'ci') {
    conf.autoWatch = false
    conf.singleRun = true
    conf.browsers.push('Firefox')
    conf.coverageReporter.reporters.push({
      type: 'lcov',
      subdir: '.'
    })
  } else {
    conf.coverageReporter.reporters.push({
      type: 'html',
      subdir: 'html'
    })
    conf.browsers.push('Chrome')
  }

  config.set(conf)
}
