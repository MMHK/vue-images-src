var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var browserify = require('browserify');


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});


gulp.task('dist', ["set-prod-node-env"], function() {
     // set up the browserify instance on a task basis
    var b = browserify({
        entries: './index.js',
        debug: false,
        standalone: "VueImageSrc"
    });
    
    b.external("vue");
    
    return b.bundle()
        .pipe(source('vue-image-src.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist"));
});

gulp.task("sample", ["set-dev-node-env"], function() {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './index.js',
        debug: true,
        standalone: "VueImageSrc"
    });
    
    b.external("vue");
    
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest("docs"));
});

gulp.task("dev", function() {
    var watcher = gulp.watch('./src/*.js', ['sample']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});



gulp.task("default", ["dist"])