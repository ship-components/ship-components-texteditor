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

module.exports = function(grunt) {
  var webpack = require('webpack');
  var path = require('path');

  /** **************************************************************************
   * Build
   */
  var buildOptions = Object.assign({}, require('./webpack.config'), {
    // Clear default plugins so we can override through grunt
    plugins: []
  });

  grunt.config.set('webpack', {

    options: buildOptions,

    dev: {},

    dist : {

      output: {
        filename: '[name].min.js'
      },

      plugins: [
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
      plugins: [],
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
        'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup'
      },
      postcss: {

      }
    });

    // Remove Extract Plugin. Gotta clone to prevent changing above config
    serverOptions.module = Object.assign({}, serverOptions.module);
    serverOptions.module.loaders = serverOptions.module.loaders.slice(0);
    serverOptions.module.loaders.push({
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]--[local]-[hash:base64:5]!postcss-loader'
      ]
    });
    // File loader
    serverOptions.module.loaders.push({
     test: /\.(png|svg|jpeg|jpg|ttf|eot|woff)/,
     loader: "file?name=[path][name].[ext]"
    });


  grunt.config.set('webpack-dev-server', {
    options: {
      webpack: serverOptions,
      host: 'localhost',
      contentBase: 'examples/',
      publicPath: '/assets/',
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
