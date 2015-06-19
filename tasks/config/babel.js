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

  grunt.config.set('babel', {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/TextEditor.js': 'src/index.jsx'
      }
    }
  });

};
