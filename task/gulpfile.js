
/*-~- Config File -~-*/

var config = require('./gulp-config')(),
/*-~- Packages -~-*/

    gulp = require('gulp'),
    args = require('yargs').argv,
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    $ = require('gulp-load-plugins')({lazy: true});

/*-~- Tasks -~-*/

    //Default (when you run 'gulp' alone, this is executed)
gulp.task('default', ['help']);     //Current default task is help

    //Help
gulp.task('help', $.taskListing);   //Lists out all of your tasks

    //JS All tasks
gulp.task('js', funcJS);

    //CSS All tasks with SourceMaps
gulp.task('css', funcCSS);

/*-~- Watchers -~-*/

    //JS watcher
gulp.task('js:watch', ['js'], function () {
    gulp.watch(config.pathsDev.js, ['js']);
});

    //CSS watcher
gulp.task('css:watch', ['css'], function () {
    gulp.watch(config.pathsDev.scss, ['css']);
});

/*-~- Functions -~-*/

    //Log Functions
        //Msg
function logMsg(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
        //Warn
function logWarn(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.bgBlue.black(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.bgBlue.black(msg));
    }
}
        //Error
function logError(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.bgRed.yellow(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.bgRed.yellow(msg));
    }
}

    //Clean up
function clean(dir) {
    logWarn('[Cleaner] Cleaning ' + dir + ' from it\'s contents');
    del(dir, {force: true});
}

    //JS (for Task)
function funcJS() {
    if(args.server) {   //if passed --server argument checks the server js file
        logMsg('[JS] Checking server file for errors..');
        return gulp
            .src(config.pathsDev.server)
            .pipe($.logger({
                before: $.util.colors.magenta('[JS]') + ' Starting JavaScript Code Style check..',
                after: $.util.colors.magenta('[JS]') + ' JSCS complete!',
                colors: true
            }))
            .pipe($.jscs())
            .pipe($.logger({
                before: $.util.colors.magenta('[JS]') + ' Starting JavaScript Code Quality and error check..',
                colors: true
            }))
            .pipe($.jshint())
            .on('error', onError)
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe($.jshint.reporter('fail'))
            .on('error', onError)
            .pipe($.logger({
                after: $.util.colors.magenta('[JS]') + ' JSHint complete!',
                colors: true
            }))
            //.pipe($.jscs.reporter())
    } else {            //else it checks the development js files
        logMsg('[JS] Checking JavaScript files for errors..');
        clean(config.outputClient.js + '**/*');
        return gulp
            .src(config.pathsDev.js)
            .pipe($.logger({
                before: $.util.colors.magenta('[JS]') + ' Starting JavaScript Code Style check..',
                after: $.util.colors.magenta('[JS]') + ' JSCS complete!',
                colors: true
            }))
            .pipe($.jscs())
            .pipe($.logger({
                before: $.util.colors.magenta('[JS]') + ' Starting JavaScript Code Quality and error check..',
                colors: true
            }))
            .pipe($.jshint())
            .on('error', onError)
            .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe($.jshint.reporter('fail'))
            .on('error', onError)
            .pipe($.logger({
                after: $.util.colors.magenta('[JS]') + ' JSHint complete!',
                colors: true
            }))
            .pipe($.jscs.reporter())
            .pipe($.logger({
                before: $.util.colors.magenta('[JS]') + ' Copying JS to ' + config.outputClient.js,
                after: $.util.colors.magenta('[JS]') + ' Gulp JS complete!',
                colors: true
            }))
            .pipe(gulp.dest(config.outputClient.js));
    }
}

    //CSS (for Task)
function funcCSS() {
    clean(config.outputClient.css + '**/*');
    return gulp
        .src(config.pathsDev.scss)
        .pipe($.sourcemaps.init())
            .pipe($.logger({
                before: $.util.colors.magenta('[CSS]') + ' Starting CSS compilation..',
                after: $.util.colors.magenta('[CSS]') + ' CSS compilation complete!',
                colors: true
            }))
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.logger({
                before: $.util.colors.magenta('[CSS]') + ' Starting autoprefixer..',
                after: $.util.colors.magenta('[CSS]') + ' Autoprefixer complete!',
                colors: true
            }))
            .pipe($.autoprefixer({
                browsers: config.browsers,
                cascade: false
            }))
            .pipe($.logger({
                before: $.util.colors.magenta('[CSS]') + ' Minifying CSS..',
                after: $.util.colors.magenta('[CSS]') + ' Minifying complete!',
                colors: true
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe($.sourcemaps.write('.'))
        .pipe($.logger({
            after: $.util.colors.magenta('[CSS]') + ' Gulp CSS complete!',
            colors: true
        }))
        .pipe(gulp.dest(config.outputClient.css))
}

    //Error
function onError(err) {
    logError(err);
    this.emit('end');
}

/*-~- Server -~-*/

    //Dev

gulp.task('server', ['css', 'js'], function() {

    // start nodemon to auto-reload the dev server
    $.nodemon({
        script: config.pathsDev.server,
        ext: 'html scss js',
        watch: [config.outputClient.client + '/**/*.html', config.pathsDev.scss, config.pathsDev.js, config.pathsDev.server],
        env: {NODE_ENV : 'development'}
    })
        .on('change', ['js'])
        .on('restart', function () {
            logMsg('[SERVER] Server Restarted!');
            funcCSS();
            funcJS();
        });

    // start live-reload server
    $.livereload.listen({ start: true});

    // watch HTML
    gulp.watch(config.outputClient.client + '/**/*.html', function() {
        return gulp
            .src(config.outputClient.client + '/**/*.html')
            .pipe($.livereload());
    });
    

    // watch app scripts
    gulp.watch(config.pathsDev.js, ['js'], function() {
        return logMsg('').pipe($.livereload());
    });

    // watch styles
    gulp.watch(config.pathsDev.scss, function() {
        return funcCSS()
            .pipe($.livereload());
    });

});
