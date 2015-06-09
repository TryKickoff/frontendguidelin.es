module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		site: grunt.file.readYAML('statix/src/data/site.yml'),

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*", "chotto", "assemble"]});


	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/**
	 * Available tasks:
	 * grunt            : Alias for 'serve' task, below
	 * grunt serve      : watch js, images & scss and run a local server
	 * grunt watch      : run sass:kickoff, uglify and livereload
	 * grunt dev        : run uglify, sass:kickoff & autoprefixer:kickoff
	 * grunt deploy     : run jshint, uglify, sass:kickoff and csso
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide
	 * grunt icons      : generate the icons. uses svgmin and grunticon
	 * grunt checks     : run jshint & scsslint
	 */

	/**
	 * GRUNT * Alias for 'serve' task, below
	 */
	grunt.registerTask('default', ['serve']);


	/**
	 * GRUNT SERVE * A task for a static server with a watch
	 * run browserSync and watch
	 */
	grunt.registerTask('serve', [
		'clean:all',
		'shimly',
		'compileJS',
		'compileCSS',
		'images',
		'clean:temp',
		'copy',
		'assemble',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [
		'clean:all',
		'shimly',
		'compileJS',
		'compileCSS',
		'images',
		'clean:temp',
		'copy',
		'assemble'
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	grunt.registerTask('deploy', [
		'clean:all',
		'shimly',
		'compileJS',
		'compileCSS',
		'csso',
		'images',
		'clean:temp',
		'copy',
		'assemble'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task to view the styleguide
	 */
	grunt.registerTask('styleguide', [
		'clean:all',
		'shimly',
		'compileJS',
		'compileCSS',
		'images',
		'clean:temp',
		'copy',
		'assemble',
		'browserSync:styleguide',
		'watch'
	]);


	/**
	 * GRUNT IMAGES * A task to compress all non-grunticon images
	 */
	grunt.registerTask('images', [
		'imagemin:images',
		'icons'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'imagemin:grunticon',
		'grunticon',
		'clean:temp'
	]);


	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'jshint:project',
		'scsslint',
		'validation'
	]);


	/**
	 * Utility tasks
	 */
	// Compile JS

	grunt.registerTask('compileJS', [
		'browserify:dev'
	]);


	// Compile CSS
	grunt.registerTask('compileCSS', [
		'sass',
		'autoprefixer'
	]);
};
