"use strict";

const gulp = require("gulp"),
    del = require("del"),
    sass = require("gulp-sass"),
    svgmin = require("gulp-svgmin"),
    postcss = require("gulp-postcss");

gulp.task("delete_icons", function () {
    return del("src/assets/icons/*.svg");
});

gulp.task("svgmin", function () {
    return gulp.src("src/assets/icons/orig/*")
        .pipe(svgmin(
            { removeStyleElement: true },
            { removeComments: true }
        ))
        .pipe(gulp.dest("src/assets/icons/"));
})

gulp.task("svg_icons", function () {
    return gulp.src("src/assets/css/icon.css")
        .pipe(postcss([
            require("postcss-inline-svg")({
                removeFill: true
            })
        ]))
        .pipe(gulp.dest("src/assets/css/"));
})

gulp.task("sass_icons", function () {
    return gulp.src("src/assets/sass/icon.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(gulp.dest("src/assets/css/"));
});

gulp.task("watch", function () {
    console.log("");
    console.log("---- INICIANDO WATCH ----");

    gulp.watch("src/assets/sass/icon.scss", gulp.series("sass_icons", "svg_icons"));
    gulp.watch("src/assets/icons/orig/*.svg", gulp.series(
        "delete_icons",
        "svgmin",
        "sass_icons",
        "svg_icons"
    ));
});

gulp.task("default", gulp.series("watch"));
