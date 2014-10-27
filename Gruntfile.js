'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },

      dist: {
        files: {
          'dist/dashCommunicator.min.js': [
            'js/scripts/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js',
            'js/scripts/namespace.js',
            'js/scripts/dash_communicator/window_getters/current_window_getter.js',
            'js/scripts/dash_communicator/window_getters/top_window_getter.js',
            'js/scripts/dash_communicator/dom_manipulator.js',
            'js/scripts/dash_communicator/post_message_connector.js',
            'js/scripts/dash_communicator/receivers/fixed_position_receiver.js',
            'js/scripts/dash_communicator/receivers/infinite_scroll_receiver.js',
            'js/scripts/dash_communicator/sender.js'
          ]
        }
      }
    },

    clean: {
      all: '.tmp'
    },

    jshint: {
      src: ['js/scripts/dash_communicator/**/*.js']
    }
  });

  grunt.registerTask('build:js', [
                     'jshint',
                     'clean',
                     'uglify'
  ]);
  grunt.registerTask('build', ['build:js']);
};
