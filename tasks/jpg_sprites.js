/*
 * grunt-jpg-sprites
 * https://github.com/lukaszlipinski/grunt-jpg-sprites
 *
 * Copyright (c) 2014 Lukasz Lipinski
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('jpg_sprites', 'Grunt task for converting a set of images into a sprite sheet', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({

		});

		var orientation_sign = options.orientation === "horizontal" ? "+" : "-";

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			// Concat specified files.
			var src = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}
				else {
					return true;
				}
			}).map(function (filepath) {
				return filepath;
			}).join(grunt.util.normalizelf(" "));

			//exec("convert " + src + " " + orientation_sign + "append " + f.dest);
			exec("convert " + src + " " + orientation_sign + "append -size 32x32 " + f.dest);

		});
	});
};
