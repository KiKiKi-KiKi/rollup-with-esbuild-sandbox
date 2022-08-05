import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
// not working with ESM and CJS
// commonjs() プラグインを使うと jQuery がうまくバンドルできない
import commonjs from '@rollup/plugin-commonjs';
// minify
import { terser } from 'rollup-plugin-terser';
// remove console.log
import strip from '@rollup/plugin-strip';

const isProduction = process.env.MODE === 'production' || false;

const inputFile = './src/index.js';
const outputFile = isProduction ? './build/dist.min.js' : './build/dist.js';
// esm, cjs, amd, system, iife, umd
const format = 'iife';
const plugins = [
  // commonjs(),
  nodeResolve(),
  babel({ babelHelpers: 'bundled' }),
];

const config = () => {
  if (isProduction) {
    return {
      // entrypoint
      input: inputFile,
      output: {
        file: outputFile,
        format,
        plugins: [terser()],
      },
      plugins: [
        ...plugins,
        strip({
          labels: ['unittest'],
        }),
      ],
    };
  } else {
    return {
      // entrypoint
      input: inputFile,
      output: {
        file: outputFile,
        format,
      },
      plugins: [...plugins],
    };
  }
};

export default config();
