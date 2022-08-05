import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
// not working with ESM and CJS
import commonjs from '@rollup/plugin-commonjs';

const config = {
  // entrypoint
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    // esm, cjs, amd, system, iife, umd
    format: 'iife',
  },
  plugins: [commonjs(), nodeResolve(), babel({ babelHelpers: 'bundled' })],
};

export default config;
