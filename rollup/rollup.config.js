import { nodeResolve } from '@rollup/plugin-node-resolve';
// not working
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
    nodeResolve(),
    // commonjs()
  ],
};

export default config;
