import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: './src/main.js',
  output: {
    file: './build/bundle.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    commonjs({
      transformMixedEsModules: true,
    }),
  ],
};

export default config;
