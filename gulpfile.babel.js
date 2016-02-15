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

    function rebundle(bundler) {
        return bundler.bundle()
            .on('error', function(err) {
                var msg = err.message.replace(new RegExp(err.filename + ':', 'g'), '');
                $.util.log(
                    $.util.colors.red(err.filename),
                    $.util.colors.yellow(err.loc.line + ':' + err.loc.column),
                    '\n** \t',
                    msg
                );
                this.emit('end');
            })
            .pipe($.duration('Building'))
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe($.sourcemaps.init({ loadMaps: true }))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    }

    if (watch) {
        var watcher = watchify(bundler);
        rebundle(watcher);
        return watcher.on('update', function() {
            rebundle(watcher);
        });
    } else {
        return rebundle(bundler);
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

gulp.task('live', ['watch', 'serve'], function() {});

gulp.task('default', ['build'], function() { });
