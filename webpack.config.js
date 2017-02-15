const webpack = require('webpack');
const {resolve} = require('path');

module.exports = function (env) {
    return {
        context: resolve(__dirname, './devtool'),
        entry: {
            devtools: './src/chrome/devtools.js',
            background: './src/chrome/background.js',
            contentScript: './src/chrome/contentScript.js',
            panel: './src/chrome/panel.js',
            fe_libs: ['react', 'react-redux', 'redux', 'react-dom']
        },
        output: {
            path: resolve(__dirname, './devtool/src/build'),
            filename: '[name].js'
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'fe_libs',
                filename: 'fe_libs.js',
                minChunks: Infinity                
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'bs_libs',
                filename: 'bs_libs.js',
                minChunks: Infinity                
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)                    
                }
            })
        ],
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: ['babel-loader']
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                // Only needed for vendor deps (angular-material)
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    { loader: 'css-loader', query: { modules: false } }
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            }
                        }
                    },
                    'less-loader'
                ]
            }, {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [ 'url-loader' ]
            }]
        }
    };
};