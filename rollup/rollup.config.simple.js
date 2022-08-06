import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: './src/main.js',
  output: {
    file: './build/bundle.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    commonjs({
      // extensions: ['.js', '.cjs'],
      // 明示的に
      // include: [/node_modules/, /src/],
      transformMixedEsModules: true,
    }),
  ],
};

export default config;
