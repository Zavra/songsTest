var gulp = require('gulp'); // Gulp JS itself :)
var minifyCSS = require('gulp-minify-css'); //for css minification
//var imagemin = require('gulp-imagemin'); // for images minification
var uglify = require('gulp-uglify'); // JS minification
var concat = require('gulp-concat'); // merge files
var connect = require('connect'); // Webserver
var rename = require('gulp-rename'); //files renaming
var del = require('del'); // deleting
var browserSync = require("browser-sync").create(); //synchronize changes with browser
var reload = browserSync.reload;
//var svgSprite = require('gulp-svg-sprite') //svg sprites
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer'); //autoprefixer postprocessor
var sourcemaps = require('gulp-sourcemaps'); //creating source maps

var path = {
    build: {
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/i/',
        fonts: 'public/fonts/'
    },
    watch: {
        js: 'resources/assets/js/*.js',
        img: 'resources/assets/i/**/*.*',
        fonts: 'resources/assets/fonts/**/*.*',
        scss: 'resources/assets/scss/**/*.scss'
        //svg: 'resources/i/svg/*.svg',
    }
};

// - SCSS LIBRARY
gulp.task('scss_library', function () {
    //сайт
    gulp.src([
        "./vendor/bower_components/bootstrap/scss/bootstrap.scss", //bootstrap
    ])
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                includePaths: [],
                imagePath: path.watch.img
            })
            .on('error', sass.logError)
        )

        // https://github.com/ai/browserslist
        .pipe(autoprefixer("last 2 version", "> 1%", "Explorer >= 8", {
            cascade: true
        }))

        .pipe(concat('all_library.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css))
        //.pipe(reload({stream: true}));
});

// - SCSS
gulp.task('scss', function () {
    //сайт
    gulp.src([
        path.watch.scss
    ])
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                includePaths: [],
                imagePath: path.watch.img
            })
            .on('error', sass.logError)
        )

        // https://github.com/ai/browserslist
        .pipe(autoprefixer("last 2 version", "> 1%", "Explorer >= 8", {
            cascade: true
        }))

        .pipe(concat('all.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css))
        //.pipe(reload({stream: true}));

});


// - JS LIBRARY
gulp.task('js_library', function() {
    //сайт
    gulp.src([
        "./vendor/bower_components/jquery/dist/jquery.js",
    ])
    .pipe(concat('all_library.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));

});

// - JS
gulp.task('js', function() {
    //сайт
    gulp.src([
        path.watch.js
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));

});

//creating virtual webserver
gulp.task('webserver', function () {
    browserSync.init({
        proxy: ""
    });
});

// images minifying
gulp.task('images', function() {
    gulp.src(path.watch.img)
        //.pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

//copy fonts
gulp.task('fonts', function() {
    gulp.src(path.watch.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

//watching changes
gulp.task('watch', function(event) {
    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.img, ['images']);
    gulp.watch(path.watch.fonts, ['fonts']);
    gulp.watch(path.watch.scss, ['scss']);
});

//to run this write in console -> gulp build
gulp.task('build', [
    'js_library',
    'js',
    'scss_library',
    'scss',
    'fonts',
    'images'
]);

//to run this write in console -> gulp
gulp.task('default', [
    'build',
    //'webserver',
    'watch'
]);
