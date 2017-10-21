var gulp = require('gulp'), // Сообственно Gulp JSStylus
    minifyCSS = require('gulp-minify-css'), // Минификация CSS
    //imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    connect = require('connect'); // Webserver
var rename = require('gulp-rename'); //переименовывалка
//var jshint = require('gulp-jshint'); //проверка js файлов
var del = require('del'); //удалялка
var less = require('gulp-less'); //конвертит less
var browserSync = require("browser-sync").create(); //синхронизирует изменения с браузером
var reload = browserSync.reload;



var path = {
    build: {
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/i/',
        fonts: 'public/fonts/'
    },
    watch: {
        html: 'resources/views/**/*.php',
        js: 'resources/js/**/*.js',
        less: 'resources/less/*.less',
        less_main: 'resources/less/style.less',
        img: 'resources/i/**/*.*',
        fonts: 'resources/fonts/**/*.*'
    }
};

//создать виртуальный вебсервер
gulp.task('webserver', function () {
    browserSync.init({
        proxy: "coinloft.tvr"
    });
});

// Собираем JS
gulp.task('js', function() {
    gulp.src([
        "./vendor/bower_components/jquery/dist/jquery.js",
        "./vendor/bower_components/jquery-validation/dist/jquery.validate.js", //form validation
        "./vendor/bower_components/bootstrap/dist/js/bootstrap.js",
        path.watch.js
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify()) //раскоменить после разработки - постоянно валится из за ошибок в js
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));

    //console.log('js gen');
});

//css
gulp.task('style', function () {
    gulp.src([
        "./vendor/bower_components/bootstrap/less/bootstrap.less",
        //"./vendor/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css", //выпадающая бутстраповская дата
        //"./vendor/bower_components/jquery-uploadfile/css/uploadfile.css", //подгрузка файлов ajax
        //"./vendor/bower_components/Jcrop/css/jquery.Jcrop.css", //crop файлов
        "./vendor/bower_components/font-awesome/less/font-awesome.less", //иконки http://fortawesome.github.io/Font-Awesome/
        "./vendor/bower_components/bootstrap-social/bootstrap-social.css", //иконки соцсетей для bootstrap http://lipis.github.io/bootstrap-social/
        path.watch.less_main
    ])
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

//очищалка public картинок
//что б запустить только это вбиваем в терминал gulp clean
gulp.task('clean', function(){
    del(path.build.css);
    //del(path.build.img);
    del(path.build.js);
});


/*
// Линтинг файлов - проверка js файлов
gulp.task('lint', function() {
    gulp.src(path.watch.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
*/

// Сжимаем картинки
gulp.task('images', function() {
    gulp.src(path.watch.img)
        //.pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));

    //console.log('image gen');
});

//копируем шрифты
gulp.task('fonts', function() {
    gulp.src([
        "./vendor/bower_components/bootstrap/fonts/**/*.*",
        path.watch.fonts
    ])
    .pipe(gulp.dest(path.build.fonts))
});

//следим за изменением темплейтов
gulp.task('html', function () {
    browserSync.reload();
});

//задания слежения
gulp.task('watch', function(event) {
    gulp.watch(path.watch.js, ['js']);
    //turn off for now...      gulp.watch(path.watch.img, ['images']);
    gulp.watch(path.watch.fonts, ['fonts']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.less, ['style']);
    //gulp.watch(path.watch.less_admin, ['style']);
    //gulp.watch(path.watch.js_admin, ['js']);
});

//что б запустить только это вбиваем в терминал gulp build
gulp.task('build', [
    'js',
    'style',
    'fonts',
    'images'
]);

//что б запустить всё всё вбиваем в терминал gulp
gulp.task('default', ['clean', 'build', 'watch']);
//gulp.task('default', ['clean', 'build', 'webserver', 'watch']);

