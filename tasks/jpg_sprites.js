/*
 * grunt-jpg-sprites
 * https://github.com/lukaszlipinski/grunt-jpg-sprites
 *
 * Copyright (c) 2014 Lukasz Lipinski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('jpg_sprites', 'Grunt task for converting a set of images into a sprite sheet', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation : '.',
			separator : ', '
		});

		grunt.log.writeln("test", this.files);
	});
};
