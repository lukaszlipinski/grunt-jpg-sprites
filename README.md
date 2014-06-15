# grunt-jpg-sprites

> Grunt task for converting a set of images into a sprite sheets. Supports any type of images which is supported by ImageMagick (JPG, PNG and more).

## Getting Started
This plugin requires Grunt `0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jpg-sprites --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jpg-sprites');
```

## The "jpg_sprites" task

### Overview
In your project's Gruntfile, add a section named `jpg_sprites` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jpg_sprites: {
    options: {
      orientation : 'horizontal',
      sizes : ['100x100', '50x50', '40x40']
    },
    files: {
      'images/output2.jpg' : ['images/*.jpg'],
      'images/output2.png' : ['images/*.png']
    },
    compression : {
	  type : "JPEG",
      quality : 100
    }
  },
});
```

### Options

#### options.orientation
Type: `String`
Default value: `'horizontal'`
Possible values: `'horizontal'`, `'vertical'`

Determines how images will be arranged in image sprite.

#### [options.sizes]
Type: `Array`
Default value: `[]`


#### [options.compression]
Type: `Object`
Default value: `{type : "None", quality : 100}`

Determines whether image should be compressed or not. Quality is from range 0 to 100. Possible compression types are:
'B44', 'B44A', 'BZip', 'DXT1', 'DXT3', 'DXT5', 'Fax', 'Group4', 'JBIG1',
'JBIG2', 'JPEG', 'JPEG2000', 'Lossless', 'LosslessJPEG', 'LZMA', 'LZW',
'None', 'Piz', 'Pxr24', 'RLE', 'Zip', 'RunlengthEncoded', 'ZipS'

## Usage Examples

### When you just want to create a sprite from random-size images:

```js
grunt.initConfig({
  jpg_sprites: {
    options: {
      orientation : 'horizontal'
    },
    files: {
      'images/output2.jpg' : ['images/*.jpg']
    }
  },
});
```

### When you have set of images of the same size and you want to create multiple resized sprites:

```js
grunt.initConfig({
  jpg_sprites: {
    options: {
      orientation : 'horizontal',
      sizes : ['100x100', '50x50', '40x40']
    },
    files: {
      'images/output2.jpg' : ['images/*.jpg']
    }
  },
});
```

### Example with enabled compression

```js
grunt.initConfig({
  jpg_sprites: {
    options: {
      orientation : 'horizontal',
      sizes : ['100x100', '50x50', '40x40'],
      compression : {
        type : "JPEG",
      	quality : 100
      }
    },
    files: {
      'images/output2.jpg' : ['images/*.jpg']
    }
  },
});
```

## Dependencies
- ImageMagick 6.8.9-1 (tested)

## Release History
- Version 0.3.x - Support for compression has been added
- Version 0.2.x - Sprite creation and resizing
