var gulp = require('gulp');
var umd = require('gulp-umd');

gulp.task('umd', function() {
  return gulp.src('src/*.js')
    .pipe(umd({
      exports: function(file) {
          return 'oUtil';
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['umd']);