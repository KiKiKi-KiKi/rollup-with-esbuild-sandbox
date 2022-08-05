# Rollup sandbox

- https://rollupjs.org/guide/en/

## :construction: Build with configure file

```sh
$ npx rollup --config my.config.js
```

設定ファイルが `rollup.config.mjs`, `rollup.config.cjs`, `rollup.config.js` の場合はファイル名を省略できる

### :memo: Configure

`rollup.config.js`

```js
const config = {
  // entrypoint
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    // esm, cjs, amd, system, iife, umd
    format: 'iife',
  },
  plugins: [],
};

export default config;
```

cf. https://rollupjs.org/guide/en/#configuration-files

## Bundle npm package

[@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve)

cf. https://nansystem.com/rollup-plugin-commonjs-and-rollup-plugin-node-resolve/

```sh
$ npm i -D @rollup/plugin-node-resolve
```

`rollup.config.js`

```diff
+ import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    // esm, cjs, amd, system, iife, umd
    format: 'iife',
  },
- plugins: [],
+ plugin: [nodeResolve()]
};

export default config;
```

### :warning: Bundle CommonJS

[@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs) プラグインを使ったが、ESM と混在している場合は `require` 文がそのまま出力されてしまいうまく動作しなかった

`rollup.config.js`

```js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    format: 'iife',
  },
  plugin: [commonjs(), nodeResolve()],
};
```

#### :ok_person: CommonJS (`require`) のみの場合は OK

`sub.cjs.js`

```js
exports.sub = (x, y) => {
  return x - y;
};
```

`main.js`

```js
const sub = require('./sub.cjs').sub;

const x = sub(10 - 5);
console.log(x);
```

:point_down: Build

```js
(function () {
  'use strict';

  var src = {};

  var sub_cjs = {};

  sub_cjs.sub = (x, y) => {
    return x - y;
  };

  const sub = sub_cjs.sub;

  const x = sub(10 - 5);
  console.log(x);

  return src;
})();
```

#### :no_good: ESM (`import`) と CommonJS (`require`) が混在すると NG

sum.js

```js
export const sum = (x, y) => {
  return x + y;
};
```

`main.js`

```js
import { sum } from './sum';
const sub = require('./sub.cjs').sub;

const a = sum(1, 2);
console.log(a);

const b = sub(10 - 5);
console.log(b);
```

:point_down: Build

```js
(function () {
  'use strict';

  const sum = (x, y) => {
    return x + y;
  };

  const sub = require('./sub.cjs').sub;

  const a = sum(1, 2);
  console.log(a);

  const b = sub(10 - 5);
  console.log(b);
})();
```

:memo: `require` 文を先頭にしても ESM だけが解消される
