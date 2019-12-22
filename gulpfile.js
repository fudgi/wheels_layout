const gulp = require("gulp");
const postcss = require("gulp-postcss");
const nested = require("postcss-nested");
const newer = require("gulp-newer");
const browserSync = require("browser-sync").create();

gulp.task("css", () =>
  gulp
    .src("./src/**/*.css")
    .pipe(postcss([nested]))
    .pipe(gulp.dest("dest"))
);

gulp.task("html", () => gulp.src("./src/*.html").pipe(gulp.dest("dest")));

gulp.task("assets", function() {
  return gulp
    .src("src/img/**", { since: gulp.lastRun("assets") })
    .pipe(newer("dest"))
    .pipe(gulp.dest("dest/img/"));
});

gulp.task("build", gulp.parallel("css", "html", "assets"));

gulp.task("watch", () => {
  gulp.watch("./src/*.css", gulp.series("css"));
  gulp.watch("./src/img", gulp.series("assets"));
  gulp.watch("./src/*.html", gulp.series("html"));
});

gulp.task("serve", () => {
  browserSync.init({
    server: "dest"
  });
  browserSync.watch("dest/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("build", gulp.parallel("watch", "serve")));
