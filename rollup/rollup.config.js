import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
  // entrypoint
  input: './src/index.js',
  output: {
    file: './build/dist.js',
    // esm, cjs, amd, system, iife, umd
    format: 'iife',
  },
  plugins: [nodeResolve()],
};

export default config;
