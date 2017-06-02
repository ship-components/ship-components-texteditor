var path = require('path');
var webpack = require('webpack');
var PackageBanner = require('package-banner');
var banner = new PackageBanner({
  wrap: false
}).build();
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Where to start
  entry: {
    TextEditor: './src/TextEditor.js'
  },

  // Where to output
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  externals: {
    'react': true,
    'react-dom': true,
    'immutable': true,
    'draft-js': true,
    'classnames' : true,
    'react-addons-css-transition-group': true,
    'ship-components-buttons': true,
    'ship-components-icon': true
  },

  stats: {
    colors: true,
    modules: false,
    reasons: true
  },

  module: {
    // preLoaders: [{
    //   test: /\.jsx?|\.es6$/,
    //   exclude: /(node_modules|bower_components)/,
    //   loader: 'eslint-loader'
    // }],
    loaders: [
      // Setup jsx loader
      {
        test: /\.jsx?|\.es6$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }, {
        // Setup jsx loader for ship components
        test: /\.jsx?|\.es6$/,
        include: /ship-components-.*\/src/,
        loader: 'babel'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
          // File loader
         test: /\.(png|svg|jpeg|jpg|ttf|eot|woff)/,
         loader: 'file?name=[path][name].[ext]'
      }, {
        // CSS Modules
        test: /\.css$/,
        include: [
          /src\//,
          /ship-components-.*\/src/
        ],
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]--[local]!postcss-loader'
        )
      }
    ]
  },

  postcss: [
    require('postcss-nested'),
    require('postcss-simple-vars')({
      variables: {
        'primary-color' : '#42aa65',
        'base-grid-size': '4px'
      }
    }),
    require('postcss-color-hex-alpha'),
    require('postcss-color-function'),
    require('postcss-calc'),
    require('autoprefixer')
  ],

  jshint: {
    failOnHint: false,
    esnext: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    fallback: path.resolve(__dirname, '../../node_modules')
  },

  resolveLoader: {
    fallback: path.resolve(__dirname, '../../node_modules')
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    // new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.BannerPlugin(banner)
  ]
};
