import { input, output, plugins } from './config.common.mjs';

const config = {
  input,
  output: {
    ...output,
  },
  plugins: [...plugins],
};

export default config;
