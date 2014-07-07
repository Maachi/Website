module.exports = function(grunt) {

	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			beforeconcat: ['static/javascript/src/**.js'],
			afterconcat: ['static/javascript/maachi.js']
		},

		less: {
			maachi: {
				files: {
					'static/css/maachi.css': 'static/css/src/maachi.less'
				},
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: 'static/css/maachi.css.map',
					sourceMapRootpath: '../../../',
					sourceMapURL: 'maachi.css.map'
				}
			}
		},


		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				footer: '/*! END <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			js: {
				src: [
					'static/javascript/src/maachi.js'
				],
				dest: 'static/javascript/maachi.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			js: {
				src: 'static/javascript/maachi.js',
				dest: 'static/javascript/maachi.min.js'
			}
		},


		// Auto vendor prefixes
		autoprefixer: {
			options: {
				browsers: ['last 4 versions']
			},
			css: {
				files: {
					'static/css/maachi.css': 'static/css/maachi.css'
				}
			}
		},


		// Minify css
		cssmin: {
			minify: {
				files:{
					'static/css/maachi.min.css': 'static/css/maachi.css'
				}
			}
		}


	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['less', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'autoprefixer']);
};