import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
// not working with ESM and CJS
// commonjs() プラグインを使うと jQuery がうまくバンドルできない
import commonjs from '@rollup/plugin-commonjs';
// minify
import { terser } from 'rollup-plugin-terser';
// remove console.log
import strip from '@rollup/plugin-strip';
import { brotliCompress } from 'zlib';
import { promisify } from 'util';
import gzipPlugin from 'rollup-plugin-gzip';

const brotliPromise = promisify(brotliCompress);

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
        plugins: [
          terser(),
          gzipPlugin({
            fileName: '.gz',
          }),
          // Brotil compression as .br files
          gzipPlugin({
            customCompression: (content) => brotliPromise(Buffer.from(content)),
            fileName: '.br',
          }),
        ],
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
