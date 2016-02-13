var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var express = require('express');

var sources = {
    scripts: 'lib/**/*.js',
    templates: 'templates/**/*.html'
};  

gulp.task('scripts', function() {
   return gulp.src(sources.scripts)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel({ presets: ['es2015'] }))
        .pipe($.concat('main.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src(sources.templates)
       .pipe($.nunjucks.compile({
            title: 'Goblin Admonisher'
       }))
       .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(done) {
    gulp.watch(sources.scripts, ['scripts']);
    gulp.watch(sources.templates, ['templates']);
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
