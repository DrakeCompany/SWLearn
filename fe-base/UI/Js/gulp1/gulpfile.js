/**
 * Created by Sa on 2016.11.14..
 */

// var gulp = require('gulp');
// gulp.task('example', function() {// a task beépített modulja a tasknak
//     console.log('default task ran');
// });
//
// var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
// var sourcemaps = require('gulp-sourcemaps');
// gulp.task('uglify', function() {
//     gulp.src('./src/**/*.js')        // create a stream from all .js files under src
//         .pipe(sourcemaps.init())      // keep track of the original line numbers +megmutatja melyik fájlban hol van a hiba
//         .pipe(concat('build.js'))    // join the contents of the files to build.js
//         .pipe(uglify())              // minimize them
//         .pipe(gulp.dest('./build')); // stream the files into the build folder
// });
// gulp.task('default', ['uglify']);

// var gulp = require('gulp');
// var $ = require('gulp-load-plugins')(); //visszaad egy függvényt és azt meg is hívjuk
// gulp.task('uglify', function() {
//     gulp.src('./src/**/*.js')           // create a stream from all .js files under src
//         .pipe($.sourcemaps.init())      // keep track of the original line numbers
//         .pipe($.concat('build.js'))     // join the contents of the files to build.js
//         .pipe($.uglify())               // minimize it
//         .pipe($.sourcemaps.write('./')) // emit a build.js.map
//         .pipe(gulp.dest('./build'));    // stream the files into the build folder
// });
// gulp.task('default', ['uglify']);

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
gulp.task('uglify', ['jshint'],function() { // előbb a jshint-et futtatja, mivel be lett húzva függőségnek
    gulp.src('./src/**/*.js')           // create a stream from all .js files under src
       // .pipe($.plumber())              // prevent pipe from breaking
        .pipe($.plumber())          // prevent pipes from breaking ha a scsss-ben hiba van mikor megy a gulp watch, akkor kilép a watchból
        .pipe($.sourcemaps.init())      // keep track of the original line numbers
        .pipe($.babel({                 // transpile ES6 to ES5
            presets: ['latest']         // use the latest (es2017) features
        }))
        .pipe($.addSrc.prepend(mainBowerFiles()))
        .pipe($.concat('build.js'))     // join the contents of the files to build.js
        .pipe($.uglify())               // minimize it
        .pipe($.sourcemaps.write('./')) // emit a build.js.map
        .pipe(gulp.dest('./build'));    // stream the files into the build folder

});
// gulp.task('jshint', function() {
//     gulp.src(['./gulpfile.js', './src/**/*.js'])
//         .pipe($.jshint())
//         .pipe($.jshint.reporter('default'));
// });

gulp.task('jshint', function() {
    gulp.src(['./gulpfile.js', './src/**/*.js'])
        .pipe($.jshint({
            esversion: 6
        }))
        .pipe($.jshint.reporter('default'));
});

// gulp.task('sass', function() {
//     gulp.src('./src/**/*.scss')
//         .pipe($.sass())
//         .pipe(gulp.dest('./build'));
// });
gulp.task('sass', function() { // ezzel minden böngészőben egységes lesz.
    gulp.src('./src/**/*.scss')
        .pipe($.plumber())          // prevent pipes from breaking
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.cleanCss())
        .pipe($.concat('build.css'))
        .pipe(gulp.dest('./build'));
});
gulp.task('html', function() {// ha ez van akkor ki is lehet törölni a build mappát, mert mindig újragenerálja
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
});
gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['uglify', 'jshint']);
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', ['uglify', 'sass', 'html', 'jshint']);
//gulp.task('default', ['uglify', 'sass']);
//gulp.task('default', ['uglify']);  //gulp -> a consolba $. -ra elérhetők a jquery functionjai