import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';

import { input, output, outputDir, plugins } from './config.common.mjs';

const config = {
  input,
  output: {
    ...output,
    file: `${outputDir}/main.min.js`,
    plugins: [terser()],
  },
  plugins: [
    ...plugins,
    strip({
      labels: ['unittest'],
    }),
  ],
};

export default config;
