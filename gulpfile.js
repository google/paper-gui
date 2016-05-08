/*!
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var runSequence = require('run-sequence');
var del = require('del');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

var debug = false;


/** Clean up */
gulp.task('clean', function(done) {
  return del(['dist', 'build']);
});


/**  EM5-compile, bundle and minify the js */
function buildBundle(file) {
  return browserify({
    entries: [file],
    debug: debug
  })
  .transform(babelify, {presets: ['es2015']}) // es6 -> e5
  .bundle();
}


/** Build the main PaperGUI js */
gulp.task('jslibrary', function() {
  return buildBundle('src/PaperGUI.js')
    .pipe(source('lib.js'))
    .pipe($.streamify($.uglify({
      mangle: !debug
    })))
    .pipe(gulp.dest('build'));
});


/** Build the loader script */
gulp.task('jsloader', function() {
  return gulp
    .src('src/loader.js')
    .pipe($.rename('paperGUI.js'))
    .pipe($.uglify({
      mangle: !debug,
      output: {comments: /^!|@preserve|@license|@cc_on/i}
    }))
    .pipe(gulp.dest('dist'));
});


/** Copy the webcomponents polyfill to the dist folder */
gulp.task('copyWc', function () {
  return gulp
    .src('bower_components/webcomponentsjs/webcomponents-lite.min.js')
    .pipe(gulp.dest('dist'));
})


/** Vulcanize */
gulp.task('vulcanize', function() {
  return gulp.src('./elements/paper-gui.html')
    .pipe($.vulcanize({
      inlineCss: true,
      inlineScripts: true,
      stripComments: true,
      stripExcludes: ['iron-icons/iron-icons.html']
    }))
    .pipe($.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true, 
      minifyJS: true
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('default', function () {
  return runSequence('clean', 'copyWc', 'jslibrary', 'vulcanize', 'jsloader');
});
