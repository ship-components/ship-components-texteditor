/**
 * CMD: lint
 *
 * ---------------------------------------------------------------
 *
 * Lint the code
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('lint', [
    'eslint'
  ]);
};
