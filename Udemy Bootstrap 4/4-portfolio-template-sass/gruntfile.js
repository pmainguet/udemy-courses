module.exports = function(grunt) {
  
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dist: {
          options: {
            style: 'expanded'
          },
          files: {
            'public/css/bootstrap.css': 'node_modules/bootstrap/scss/bootstrap.scss',
            'public/css/custom.css': 'sass/custom.scss'
          }
        }
      },
          concat: {
            options: {
              separator: ';'
            },
            dist: {
              src: ['src/**/*.js'],
              dest: 'dist/<%= pkg.name %>.js'
            }
          },
          uglify: {
            options: {
              banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
              files: {
                'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
              }
            }
          },
          qunit: {
            files: ['test/**/*.html']
          },
          jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
              // options here to override JSHint defaults
              globals: {
                jQuery: true,
                console: true,
                module: true,
                document: true
              }
            }
          },
          watch: {
          options: { livereload: true },
            sass: {
              files: ['public/css/custom.css', 'public/'],
              tasks: ['newer:sass:dist'],
            }
        },
          connect
          : {
        server: {
          options: {
            port: 9005,
            base: 'public',
            hostname: '*',
            livereload:true
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
   
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('compile', ['sass','concat', 'uglify']);
    grunt.registerTask('default', ['compile','connect','watch']);
  };  