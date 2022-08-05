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

### gulp を ESM で使う

> Most new versions of node support most features that TypeScript or Babel provide, except the `import`/`export` syntax. When only that syntax is desired, rename to `gulpfile.esm.js` and install the [esm](https://www.npmjs.com/package/esm) module.
> cf. https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles/#transpilation

#### 1. 公式に乗っている方法

1. [esm](https://www.npmjs.com/package/esm) をインストール
2. `gulpfile.esm.js` にリネーム

#### 2. mjs として実行する方法

1. `gulpfile.mjs` にリネーム
2. `gulpfile.mjs` で import している Rollup の設定ファイルを `.mjs` 拡張子に変更  
   ※ `rollup.config.mjs` にしても `npx rollup --config` は問題なく動作する

`gulpfile.mjs`

```js
'use strict';

import gulp from 'gulp';
// import { watch, series, parallel } from 'gulp'; は import エラーになる
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
```

cf. https://dskd.jp/archives/116.html
