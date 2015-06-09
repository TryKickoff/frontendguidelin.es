module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		serve: {
			bsFiles: {
				src: [
					'<%= config.statix.dir%>/dist/assets/**/*.*',
					'<%= config.statix.dir%>/dist/**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './<%= config.statix.dir%>/dist'
				}
			}
		},


		styleguide: {
			bsFiles: {
				src: [
					'<%= config.statix.dir%>/dist/assets/**/*.*',
					'<%= config.statix.dir%>/dist/**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './<%= config.statix.dir%>/dist',
					index: 'styleguide/index.html'
				}
			}
		}
	},


	/**
	 * Assemble
	 * http://assemble.io/
	 * Static site generator used by Statix
	 * Find out more at https://github.com/TryKickoff/statix
	 */
	assemble: {
		options: {
			data: '<%= config.statix.dir%>/src/**/*.{json,yml}',
			assets: '<%= config.statix.distDir%>/assets',
			helpers: [
				'helper-moment',
				'handlebars-helper-eachitems',
				'<%= config.statix.dir%>/src/helpers/helper-*.js',
				'handlebars-helper-aggregate'
			],

			partials: ['<%= config.statix.dir%>/src/templates/includes/**/*.hbs'],
			flatten: false,

			layout: 'default.hbs',
			layoutdir: '<%= config.statix.dir%>/src/templates/layouts'
		},

		default: {
			files: [{
				cwd: './<%= config.statix.dir%>/src/templates/pages/',
				dest: '<%= config.statix.distDir %>',
				expand: true,
				src: ['**/*.hbs']
			}]
		}
	}
};
