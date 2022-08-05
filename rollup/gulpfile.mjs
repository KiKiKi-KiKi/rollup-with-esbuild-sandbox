'use strict';

import gulp from 'gulp';
import { rollup } from 'rollup';
import configDev from './rollup/config.dev.mjs';
import configProd from './rollup/config.prod.mjs';

const isProduction = process.env.NODE_ENV === 'production' || false;
const config = isProduction ? configProd : configDev;

const buildJS = async (cb) => {
  console.log({ isProduction });

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
