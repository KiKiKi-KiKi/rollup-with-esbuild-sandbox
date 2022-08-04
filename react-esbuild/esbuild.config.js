const { build } = require('esbuild');
const path = require('path');

const options = {
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV },
  entryPoints: [
    path.resolve(__dirname, 'src/index.jsx'),
    path.resolve(__dirname, 'src/styles/styles.css'),
  ],
  minify: process.env.NODE_ENV === 'production',
  bundle: true,
  target: 'es2015',
  platform: 'browser',
  outdir: path.resolve(__dirname, 'build'),
};

if (process.env.NODE_ENV === 'development') {
  options.watch = {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error);
      else console.log('watch build succeeded:', result);
    },
  };
}

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
