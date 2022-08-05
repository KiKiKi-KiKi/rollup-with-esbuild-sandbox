import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

export const input = './src/index.js';
export const outputDir = './build';
const outputFile = `${outputDir}/main.js`;

export const output = {
  file: outputFile,
  // esm, cjs, amd, system, iife, umd
  format: 'iife',
};

export const plugins = [nodeResolve(), babel({ babelHelpers: 'bundled' })];
