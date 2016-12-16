/**
 * Webpack
 *
 * ---------------------------------------------------------------
 *
 * Module loader, JSX transform, Minification, Sourcemaps
 *
 * For usage docs see:
 *    https://github.com/webpack/grunt-webpack
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = function(grunt) {

  /** **************************************************************************
   * Build
   */
  var buildOptions = Object.assign({}, require('./webpack.config'));

  grunt.config.set('webpack', {

    options: buildOptions,

    dev: {},

    dist : {

      output: {
        filename: '[name].min.js'
      },

      plugins: [
        new ExtractTextPlugin('[name].css', {
          allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.optimize.UglifyJsPlugin()
        // new webpack.BannerPlugin(banner)
      ]
    },

    watch: {
      watch: true,
      keepalive: true,
      failOnError: false,
      progress: false
    }
  });

  var serverOptions = Object.assign({}, require('./webpack.config'), {
      plugins: [
        new ExtractTextPlugin('[name].css', {
          allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(true)
      ],
      entry : {
        bundle: path.resolve(__dirname, '../../examples/index.js')
      },
      output: {
        filename: 'bundle.js'
      },
      devtool: 'eval',
      eslint: {
        failOnWarning: false
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'draft-js': 'Draft'
      }
    });

    // Remove Extract Plugin. Gotta clone to prevent changing above config
    serverOptions.module = Object.assign({}, serverOptions.module);
    serverOptions.module.loaders = serverOptions.module.loaders.slice(0);
    serverOptions.module.loaders.splice(serverOptions.module.loaders.length - 1);
    serverOptions.module.loaders.push({
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]--[local]-[hash:base64:5]!postcss-loader'
      ]
    });

  grunt.config.set('webpack-dev-server', {
    options: {
      webpack: serverOptions,
      host: 'localhost',
      contentBase: 'examples/',
      publicPath: '/',
      filename: 'bundle.js',
      keepalive: true,
      inline: true,
      hot: true,
      quiet: false,
      noInfo: false
    },

    dev: {}
  });

  grunt.loadNpmTasks('grunt-webpack');
};
