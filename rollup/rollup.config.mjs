import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
// not working with ESM and CJS
// commonjs() プラグインを使うと jQuery がうまくバンドルできない
import commonjs from '@rollup/plugin-commonjs';
// minify
import { terser } from 'rollup-plugin-terser';
// remove console.log
import strip from '@rollup/plugin-strip';

const config = {
  // entrypoint
  input: './src/index.js',
  output: [
    {
      file: './build/dist.js',
      // esm, cjs, amd, system, iife, umd
      format: 'iife',
    },
    {
      file: './build/dist.min.js',
      format: 'iife',
      plugins: [
        // Strip plugin don't work in output.plugins!
        // The "transform" hook used by the output plugin strip is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.
        strip({
          labels: ['unittest'],
        }),
        terser(),
      ],
    },
  ],
  plugins: [
    // commonjs(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    ,
  ],
};

export default config;
