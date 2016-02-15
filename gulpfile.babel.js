var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var express = require('express');

var watchify = require('watchify');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');

var sources = { 
    scripts: 'lib/**/*.js', 
    templates: 'templates/**/*.html'
};  

function compile(watch) {
    var bundler = browserify('./lib/main.js', { debug: true })
                .transform(babelify, { presets: ['es2015'] } );

    function rebundle() {
        return bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe($.sourcemaps.init({ loadMaps: true }))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    }

    if (watch) {
        var watcher = watchify(bundler);
        return watcher.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    } else {
        return rebundle();
    }
}

function watch() {
    return compile(true);
};

gulp.task('scripts', function() {
    return compile();
});

gulp.task('templates', function() {
    return gulp.src(sources.templates)
       .pipe($.nunjucks.compile({
            title: 'Goblin Admonisher'
       }))
       .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(done) {
    gulp.watch(sources.templates, ['templates']);
    compile(true);
});

gulp.task('build', ['scripts', 'templates'], function() {

});

gulp.task('serve', ['default'], function(done) {
    var app = express();
    app.use(express.static('dist'));
    var port = 3000;
    app.listen(port, function() { console.log('Listening on localhost:' + port); });
});

gulp.task('default', ['build'], function() { });
