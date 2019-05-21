const {  src, dest, series, parallel } = require('gulp');

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    zip = require('gulp-zip'),
    clean = require('gulp-clean');


const cleanTargetDir = function(){
    return gulp.src([
        '../server/static/*'
    ])
    .pipe(clean({force:true}));
}

const copyToServer = function(){
    return gulp.src([
        './build/**/*'
    ])
    .pipe(gulp.dest('../server/static/'));
}

exports.preBuild = gulp.series(cleanTargetDir);

exports.postBuild = copyToServer;

