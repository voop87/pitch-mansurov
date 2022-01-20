"use strict";
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var pipeline = require('readable-stream').pipeline;
var imagemin = require("gulp-imagemin");
var webp = require("imagemin-webp");
var extReplace = require("gulp-ext-replace");
var svgstore = require("gulp-svgstore");
var sass = require("gulp-sass")(require("sass"));
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("src/images/*-icon.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/images"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("src/images/**/*.{jpg,png}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 2}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("src/images"));
});

gulp.task("imgToWebp", function () {
  return gulp.src("src/images/**/*.{jpg,png}")
  .pipe(
    imagemin({
      verbose: true,
      plugins: webp({quality: 100})
    })
  )
  .pipe(extReplace(".webp"))
  .pipe(gulp.dest("src/images"));
});

gulp.task("copyJs", function () {
  return gulp.src([
    "src/js/**"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/images/**/*.{jpg,png,webp,svg}",
    "src/js/**",
    "src/*.ico"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("htmlmin", function () {
  return gulp.src("build/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.scss", gulp.series("css"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
  gulp.watch("src/js/**/*.js", gulp.series("copyJs", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "images",
  "imgToWebp",
  "copy",
  "css",
  "sprite",
  "html",
  "htmlmin"
  ));

gulp.task("start", gulp.series("build", "server"));