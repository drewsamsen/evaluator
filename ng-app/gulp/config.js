var gulp    = require('gulp');
var paths   = gulp.paths;
var replace = require('gulp-replace-task');
var args    = require('yargs').argv;
var yaml    = require('js-yaml');
var fs      = require('fs');

gulp.task('config', function () {

  // Get the environment from the command line
  // Note that we are defaulting to dev, since that is almost always
  // why we build. To test production (or create build for deploy) use
  // 'gulp build --env=production'
  var env = args.env || 'dev';
  var filePath = paths.src + '/config/env/' + env + '.json';
  var settings = {};

  if (fs.existsSync(filePath)) {
    // Read the settings from the right file
    settings = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  // Patterns that will be replaced
  var patterns = [
    {match: 'env_name', replacement: env},
    {match: 'api_url', replacement: settings.API_URL}
  ];

  // Replace each placeholder with the correct value for the variable.
  gulp.src(paths.src + '/config/main.conf.js')
    .pipe(replace({
      patterns: patterns,
      prefix: '___'
    }))
    .pipe(gulp.dest(paths.tmp + '/serve/config'));
});
