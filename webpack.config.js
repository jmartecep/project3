const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var paths = require('./config/react/paths')
var pkgBower = require('./package.json');

module.exports = {
  target: "web",
  devtool: "source-map",
  node: {
    fs: "empty"
  },
  entry: [
    // We ship a few polyfills by default:
    require.resolve('./config/react/polyfills'),
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // Finally, this is your app's code:
    paths.appIndexJs,
    // We include the app code last so that if there is a runtime error during
    // initialization, it doesn't blow up the WebpackDevServer client, and
    // changing JS code would still trigger a refresh.
  ],
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
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
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