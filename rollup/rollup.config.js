const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
// not working with ESM and CJS
// import commonjs from '@rollup/plugin-commonjs';

const config = {
  // entrypoint
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    // esm, cjs, amd, system, iife, umd
    format: 'iife',
  },
  plugins: [
    // commonjs(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
  ],
};

module.exports = config;
