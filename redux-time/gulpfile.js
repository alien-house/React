// gulpプラグインの読みこみ
var gulp = require('gulp');

var sass         = require("gulp-sass"); // gulp-sass
var autoprefixer = require("gulp-autoprefixer");

//監視
gulp.task("default",['server'], function() {
    // gulp.watch("./**", function() {
    //     browser.reload({stream:true});   // ファイルに変更があれば同期しているブラウザをリロード
    // });
    gulp.watch("sass/**/*.scss",["sass"]);
});

//sass関連
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
    	.pipe(plumber())
        // .pipe(frontnote({
        //     css: '../css/style.css'
        // }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});

