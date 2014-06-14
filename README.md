# grunt-jpg-sprites

> Grunt task for converting a set of images into a spritesheet

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
      orientation : 'horizontal',//vertical
      sizes : ['100x100', '50x50', '40x40']//keep in mind that its designed only to work when all images has the same size
    },
    files: {
      'images/output2.jpg' : ['images/*.jpg'],
      'images/output2.png' : ['images/*.png']
    }
  },
});
```

### Options

#### options.orientation
Type: `String`
Default value: `'horizontal'`

Determines how images will be arranged in image sprite.

#### options.sizes
Type: `Array`
Default value: `[]`

Optional value. Used to resize all images before concatenating. Please notice that when input images will have different sizes,
output sprite can be broken.

## Dependencies
ImageMagick 6.8.9-1 (tested)

## Release History
_(Nothing yet)_
