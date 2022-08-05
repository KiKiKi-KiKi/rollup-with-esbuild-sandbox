# Gulp with Rollup

```sh
$ npm i -D gulp
$ touch gulpfile.js
```

cf.

- https://gulpjs.com/
- https://www.studiobusstop.com/1466/

## Gulp から Rollup を呼び出す

`gulpfile.js`

```js
'use strict';

const { watch, parallel, series } = require('rollup');
const { rollup } = require('rollup');
const config = require('./rollup.config');

const buildJS = async (cb) => {
  console.log(config);
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
```

:warning: `gulpfile.js` 内で `require` を使う場合は `rollup.config.js` 内も `require` に揃える必要がある

`rollup.config.js`

```js
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');

const config = {
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    // esm, cjs, amd, system, iife, umd
    format: 'iife',
  },
  plugins: [commonjs(), nodeResolve(), babel({ babelHelpers: 'bundled' })],
};

module.exports = config;
```
