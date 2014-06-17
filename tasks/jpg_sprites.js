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
	 * Returns compression type
	 *
	 * @return {String}
	 */
	Helper.prototype.getCompressionType = function() {
		return this.options.compression.type;
	};

	/**
	 * Returns compression quality
	 *
	 * @return {Number}
	 */
	Helper.prototype.getCompressionQuality = function() {
		return this.options.compression.quality;
	};

	/**
	 * Determinates whether image should be compressed or not
	 *
	 * @return {String}
	 */
	Helper.prototype.hasToBeCompressed = function() {
		return this.options.compression.type !== "None";
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

	Helper.prototype.getDirectoryPath = function(filepath) {
		var parts = filepath.split("/");
		//Remove last item
		parts.pop()

		return parts.join("/");
	};

	/**
	 * Creates image sprite using ImageMagick
	 *
	 * @param {String} filepaths         string with concatenated paths to input files
	 * @param {String} output_filepath   path to output file
	 */
	Helper.prototype.createSprite = function(filepaths, output_filepath) {
		var compression = "";

		if (this.hasToBeCompressed()) {
			//-compress this.getCompressionType()
			compression = "-strip -compress " + this.getCompressionType() + " -quality " + this.getCompressionQuality() + "%";
		}

		var directory_path = this.getDirectoryPath(output_filepath);

		//Create folder structure to file if does not exist
		if (!grunt.file.exists(directory_path)) {
			grunt.file.mkdir(directory_path);
		}

		exec("convert " + filepaths + " " + this.getOrientationSign() + "append " + compression + " " + output_filepath);
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
			/**
			 * Determines how images will be arranged in image sprite.
			 *
			 * @type {String}
			 * @default 'horizontal'
			 * @possible_values 'horizontal', 'vertical'
			 */
			orientation : 'horizontal',

			/**
			 * Array of strings which represents sizes of single output image before concatenating.
			 *
			 * @type {Array}
			 * @default []
			 */
			sizes : [],

			/**
			 * Determines file compression
			 * @see http://www.imagemagick.org/script/command-line-options.php#compress
			 */
			compression : {
				/**
				 * Determines compression type
				 * @see PNG: http://www.imagemagick.org/Usage/formats/#png_quality
				 * @see JPG: http://www.imagemagick.org/Usage/formats/#jpg
				 *
				 * @type {String}
				 * @default 'None'
				 * @possible_values 'B44', 'B44A', 'BZip', 'DXT1', 'DXT3', 'DXT5', 'Fax', 'Group4', 'JBIG1',
				 *                  'JBIG2', 'JPEG', 'JPEG2000', 'Lossless', 'LosslessJPEG', 'LZMA', 'LZW',
				 *                  'None', 'Piz', 'Pxr24', 'RLE', 'Zip', 'RunlengthEncoded', 'ZipS'
				 */
				type : 'None',
				/**
				 * Output image quality from 0 to 100
				 */
				quality : 100
			}
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

		/*var lol = exec("identify images/2.jpg");
		console.log(lol)

		//identify -verbose filename
		exec("identify -verbose images/2.jpg'[50x50]'", function(error, stdout, stderr) {
			console.log("callback")
			grunt.log.writeln('stdout: ' + stdout);
			grunt.log.writeln('stderr: ' + stderr);
			if (error !== null) {
				grunt.log.writeln('exec error: ' + error);
			}
		});*/
	});
};
