const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const stylelint = require('stylelint');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    bail: true,

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/state'],
    },

    entry: {
        app: './src/client.tsx',
        vendor: [
            './src/vendor/main.ts',
            'react',
            'react-dom',
            'react-router',
            'react-helmet',
            'react-redux',
            'react-router-redux',
            'redux',
            'redux-connect',
            'redux-thunk'
        ]
    },

    output: {
        path: path.resolve('./build/public'),
        publicPath: '/public/',
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.tsx?$/,
            loader: 'tslint-loader'
        },
            {
                test: /\.tsx?$/,
                loader: 'react-hot-loader!awesome-typescript-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                include: path.resolve('./src/app'),
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 2,
                                minimize: true,
                                localIdentName: 'c_[hash:base64:5]'
                            }
                        },
                        { loader: 'postcss-loader' }
                    ]
                })
            },
            {
                test: /\.css$/,
                exclude: path.resolve('./src/app'),
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader',
                    ]
                })
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
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true,
            options: {
                tslint: {
                    failOnHint: true
                },
                postcss: function () {
                    return [
                        stylelint({
                            files: '../../src/app/*.css'
                        }),
                        postcssImport(),
                        postcssNext(),
                        postcssAssets({
                            relative: true
                        })
                    ];
                }
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].[chunkhash].js',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            }
        }),
        new ExtractTextPlugin('css/[name].[hash].css'),
        new ManifestPlugin({
            fileName: '../manifest.json'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};

const copySync = (src, dest, overwrite) => {
    if (overwrite && fs.existsSync(dest)) {
        fs.unlinkSync(dest);
    }
    const data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
};

const createIfDoesntExist = dest => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
};

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');
copySync('./src/favicon.ico', './build/public/favicon.ico', true);

module.exports = config;
