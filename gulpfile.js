var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    $ = require('gulp-load-plugins')();


// Compile Jade
gulp.task('jade', function(){

    var path = './config/default.json';
    if( fs.existsSync('./config/local.json') ){
        path = './config/local.json';
    }

    gulp.src(['jade/**/*.jade', '!jade/**/_*.jade'])
        .pipe($.plumber())
        .pipe($.data(function(file){
            var json = require(path);
            return json;
        }))
        .pipe($.jade())
        .pipe(gulp.dest('./'));
});


// watch
gulp.task('watch',function(){
    gulp.watch('jade/**/*.jade',function(event){
        gulp.run('jade');
    });
});

// Default Tasks
gulp.task('default', function() {
    gulp.run('watch');
});