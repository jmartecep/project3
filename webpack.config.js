const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var pkgBower = require('./package.json');

module.exports = {
  target: "web",
  devtool: "source-map",
  node: {
    fs: "empty"
  },
  entry: {
      'app': path.join(__dirname, 'react-app', 'Index.js')
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*','.js','.jsx', '.es6.js']
  },
  output: {
    path: path.join(__dirname, 'public', 'src'),
    filename: '[name].js'
  },
  resolveLoader: {
     moduleExtensions: ["-loader"]
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
              presets: ['env', 'react'],
              compact: false
          }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
          test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
          loader: 'url?prefix=font/&limit=10000'
      },
      {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=10000'
      },
      {
          test: /\.scss$/,
          loader: 'style!css!sass?outputStyle=expanded'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        compress: { warnings: false },
        mangle: true,
        output: {
          comments: false,
          beautify: false
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      }
    }),

    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/)
  ]
};