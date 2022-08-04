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
