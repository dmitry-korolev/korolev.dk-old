const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const postcssAssets = require('postcss-assets')
const postcssNext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const stylelint = require('stylelint')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

const config = {
  externals: nodeModules,
  target: 'node',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'src', 'state']
  },

  entry: './src/server.tsx',

  output: {
    path: path.resolve('./build/public'),
    filename: '../server.js',
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader!awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'isomorphic-style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:6]' : '[name]_[local]_[hash:base64:6]'
            }
          },
          {loader: 'postcss-loader'}
        ]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        postcss: function () {
          return [
            stylelint({
              files: '../../src/*.css'
            }),
            postcssImport(),
            postcssNext(),
            postcssAssets({
              relative: true
            })
          ]
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(false),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development')
      }
    })
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
}

const copySync = (src, dest, overwrite) => {
  if (overwrite && fs.existsSync(dest)) {
    fs.unlinkSync(dest)
  }
  const data = fs.readFileSync(src)
  fs.writeFileSync(dest, data)
}

const createIfDoesntExist = dest => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
}

createIfDoesntExist('./build')
createIfDoesntExist('./build/public')
copySync('./src/favicon.ico', './build/public/favicon.ico', true)

module.exports = config
