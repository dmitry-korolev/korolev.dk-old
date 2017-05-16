const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const postcssAssets = require('postcss-assets')
const postcssNext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const stylelint = require('stylelint')
const ManifestPlugin = require('webpack-manifest-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin

const config = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'src', 'state']
  },

  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './src/vendor.ts',
      './src/client.tsx'
    ]
  },

  output: {
    path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].js',
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'react-hot-loader!babel-loader!awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
              localIdentName: '[name]_[local]_[hash:base64:6]'
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
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
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
    new ManifestPlugin({
      fileName: '../manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
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
