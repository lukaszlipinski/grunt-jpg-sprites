/*
 * grunt-jpg-sprites
 * https://github.com/lukaszlipinski/grunt-jpg-sprites
 *
 * Copyright (c) 2014 Lukasz Lipinski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Configuration to be run (and then tested).
		jpg_sprites: {
			test: {
				options: {
					orientation : 'vertical',//vertical
					sizes : ['50x50']
				},

				files: {
					'images/output2.jpg' : ['images/*.jpg'],
					'images/output2.png' : ['images/*.png']
				}
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	//grunt.registerTask('test', ['jpg_sprites']);
};
