'use strict';

import gulp from 'gulp';
import { rollup } from 'rollup';
import config from './rollup.config.mjs';

const buildJS = async (cb) => {
  await rollup(config)
    .then((bundle) => {
      bundle.write(config.output);
    })
    .catch((error) => {
      if (cb) {
        cb();
      }
      console.error(error);
    });

  cb();
};

const buildJSTask = gulp.series(buildJS);

export default () => {
  gulp.watch(['./src/**/*.js'], buildJSTask);
};

export const build = gulp.parallel(buildJSTask);
