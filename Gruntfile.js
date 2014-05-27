module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'nyan',
          quiet: false
        },
        src: ['./test/*'],
        dest: './'
      }
    },

    jshint: {
      files: {
        src: [
          './src/*.js',
        ]
      },
      options: {
        globals: {},
        'curly': true,
        'camelcase': false,
        'evil': false,
        'browser': true,
        'trailing': true,
        'sub': true,
        'eqeqeq': false,
        'eqnull': true,
        'devel': false,
        'smarttabs': false,
        'laxbreak': false,
        'laxcomma': true,
        'jquery': false,
        'loopfunc': true,
        'indent': 4,
        'bitwise': true,
        'noarg': true,
        'noempty': true,
        'nonew': true,
        'undef': true,
        'boss': true,
        'node': true,
        'newcap': true,
        'quotmark': 'single',
        'unused': true,
        'strict': false,
        'maxparams': 0,
        'maxdepth': 5,
        'maxstatements': 20,
        'maxcomplexity': 14
      },
      files: {
        src: './src/index.js'
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