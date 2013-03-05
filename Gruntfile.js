/*jshint camelcase:false */
/*
 * node-asset-pipeline
 * https://github.com/thanpolas/node-asset-pipeline
 *
 * Copyright (c) 2013 Verbling
 * Licensed under the MIT license.
 */

var gruntAssets = require('./tasks/asset-pipeline');

module.exports = function( grunt ) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-watch');
  gruntAssets(grunt);

  //
  // Grunt configuration:
  //
  //
  grunt.initConfig({

    assets: {
      options: {
        debug: true,
        truncateHash: 8,
        manifest: 'temp/manifest.json',
        cdnurl: 'http://s3.aws.com/'
      },
      targetName: {
        src: ['./**/*.js', '!./node_modules/**/*.js', '!./temp/**/*.js'],
        dest: 'temp/out'
      }
    },

    assetsReplace: {
      options: {
        manifest: 'temp/manifest.json'
      },
      lessFiles: {
        options: {
          key: '__ASSET(%)'
        },
        files: {
          'temp/replace-out/': ['test/case/**/*.less']
        }
      }
    },

    watch: {
      test: {
        files: ['*.js', 'lib/**/*.js', 'tasks/**/*.js'],
        tasks: ['assets']
      }
    },

    /**
     * TESTING
     *
     */
    mochaTest: {
      gruntTasks: [ 'test/grunt-task/**/*.js' ]
    },

    mochaTestConfig: {
      gruntTasks: {
        options: {
          reporter: 'nyan'
        }
      }
    }


  });


  grunt.registerTask('test', 'Test all or specific targets', function(target) {
    var gruntTest = [
      'mochaTest:gruntTasks'
    ];

    var webTest = [
    ];

    // clear temp folder
    grunt.file.expand( ['temp/*'] )
      .forEach( grunt.file.delete );

    //return;
    switch( target ) {
      case 'tasks':
      case 'grunt':
      case 'node':
        grunt.task.run(gruntTest);
      break;
      case 'web':
        grunt.task.run(webTest);
      break;
      default:
        grunt.task.run(webTest);
        grunt.task.run(gruntTest);
      break;
    }

  });

  grunt.registerTask('default', ['test']);


};
