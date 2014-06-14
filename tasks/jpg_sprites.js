/*
 * grunt-jpg-sprites
 * https://github.com/lukaszlipinski/grunt-jpg-sprites
 *
 * Copyright (c) 2014 Łukasz Lipiński
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {
	function Helper(options) {
		this.options = options;
	}

	/**
	 * Returns sizes of the output images
	 *
	 * @return {Array}
	 */
	Helper.prototype.getSizes = function() {
		return this.options.sizes;
	};

	/**
	 * Returns 'orientation sign' defined by ImageMagick library which determinates how images will be positioned in
	 * image sprite.
	 *
	 * @return {String}
	 */
	Helper.prototype.getOrientationSign = function() {
		return this.options.orientation === "horizontal" ? "+" : "-";
	};

	/**
	 * Returns information whether the images should be resized or not
	 *
	 * @return {Boolean}
	 */
	Helper.prototype.hasToBeResized = function() {
		return this.options.sizes.length > 0;
	};

	/**
	 * Adds suffix to filename
	 *
	 * For example (suffix: '2.45'):
	 * /images/filename.png -> /images/filename_2.45.png
	 *
	 * @param {String} filepath   path to file
	 * @param {String} suffix     string you want to add
	 *
	 * @return {String}
	 */
	Helper.prototype.addSuffixToFileName = function(filepath, suffix) {
		var parts = filepath.split(".");

		return parts[0] + "_" + suffix + "." + parts[1];
	};

	/**
	 * Creates image sprite using ImageMagick
	 *
	 * @param {String} filepaths         string with concatenated paths to input files
	 * @param {String} output_filepath   path to output file
	 */
	Helper.prototype.createSprite = function(filepaths, output_filepath) {
		exec("convert " + filepaths + " " + this.getOrientationSign() + "append " + output_filepath);
	};

	/**
	 * Determines which action should be done
	 *
	 * @param {Array} filepaths          paths to input files
	 * @param {String} output_filepath   path to output file
	 */
	Helper.prototype.progressImages = function(filepaths, output_filepath) {
		if (this.hasToBeResized()) {
			var sizes = this.getSizes();

			sizes.forEach(function(size) {
				var modified_filepaths = "";

				filepaths.forEach(function(filepath) {
					modified_filepaths += filepath + "'[" + size + "]' ";
				});

				this.createSprite(modified_filepaths, this.addSuffixToFileName(output_filepath, size));
			}.bind(this));
		}
		else {
			this.createSprite(filepaths.join(grunt.util.normalizelf(" ")), output_filepath);
		}
	};

	grunt.registerMultiTask('jpg_sprites', 'Grunt task for converting a set of images into a sprite sheet', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			orientation : 'horizontal',
			sizes : []
		});

		var helper = new Helper(options);

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			//Get paths to files
			var filepaths = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}
				else {
					return true;
				}
			}).map(function(filepath) {
				return filepath;
			});

			//Process images
			helper.progressImages(filepaths, f.dest);
		});
	});
};
