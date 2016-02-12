var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var sources = {
    scripts: 'lib/**/*.js',
    templates: 'templates/**/*.html'
};  

gulp.task('scripts', function() {
   return gulp.src(sources.scripts)
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

gulp.task('default', ['scripts', 'templates'], function() {
    
});
