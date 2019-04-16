const gulp = require("gulp");
const gulpSass = require("gulp-sass");

const webserver = require("gulp-webserver");

const uglify = require("gulp-uglify");
const cssmin = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");


gulp.task("devSass", () => {
    return gulp.src("./src/**/*.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("./dist"))
})


gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true,
        }))
})


gulp.task("default", gulp.series("devSass", "server"))



gulp.task("zipjs", () => {
    return gulp.src("./src/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
})

gulp.task("zipcss", () => {
    return gulp.src("./src/**/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"))
})

gulp.task("ziphtml", () => {
    return gulp.src("./src/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest("./dist"))
})

gulp.task("go", gulp.series("zipjs", "zipcss", "ziphtml"))