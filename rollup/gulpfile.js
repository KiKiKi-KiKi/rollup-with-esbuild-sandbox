'use strict';

const { watch, parallel, series } = require('gulp');
const { rollup } = require('rollup');
const config = require('./rollup.config');

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

const buildJSTask = series(buildJS);

exports.default = () => {
  watch(['./src/**/*.js'], buildJSTask);
};

exports.build = parallel(buildJSTask);
