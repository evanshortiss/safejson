module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: ['./test/*'],
        dest: './'
      }
    },

    jshint: {
      files: {
        src: ['./src/*.js']
      },
      options: {
        jshintrc: './.jshintrc'
      }
    },

    browserify: {
      dist: {
        files: {
          './dist/safejson.js': ['./src/index.js'],
        },
        options: {
          bundleOptions: {
            'standalone': 'safejson',
          }
        }
      }
    },

    uglify: {
      mangle: {
        files: {
          './dist/safejson.min.js': ['./dist/safejson.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['jshint', 'mochaTest'])
  grunt.registerTask('build', ['jshint', 'browserify:dist', 'uglify:mangle']);

};
