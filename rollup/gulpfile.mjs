'use strict';

import gulp from 'gulp';
import { rollup } from 'rollup';
import gzip from 'gulp-gzip';
import gulpBrotli from 'gulp-brotli';

import configDev from './rollup/config.dev.mjs';
import configProd from './rollup/config.prod.mjs';

const isProduction = process.env.NODE_ENV === 'production' || false;
const config = isProduction ? configProd : configDev;

const buildJS = async (cb) => {
  console.log({ isProduction });

  await rollup(config)
    .then(async (bundle) => {
      await bundle.write(config.output);
      Promise.resolve();
    })
    .catch((error) => {
      if (cb) {
        cb();
      }
      console.error(error);
    });

  cb();
};

const destDir = './build';
const gzipJS = (cb) => {
  return gulp
    .src(`${destDir}/main.min.js`)
    .pipe(gzip())
    .pipe(gulp.dest(`${destDir}`));
};

const brotliJS = (cb) => {
  return gulp
    .src(`${destDir}/main.min.js`)
    .pipe(
      gulpBrotli.compress({
        extension: 'br',
      })
    )
    .pipe(gulp.dest(`${destDir}`));
};

const buildJSTask = isProduction
  ? gulp.series(buildJS, gulp.parallel(gzipJS, brotliJS))
  : gulp.series(buildJS);

export default () => {
  gulp.watch(['./src/**/*.js'], buildJSTask);
};

export const build = gulp.parallel(buildJSTask);
