var gulp = require('gulp')
	, uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('src/*.js')
    .pipe(uglify({
		preserveComments: 'some'
	}))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['compress'], function() {});
