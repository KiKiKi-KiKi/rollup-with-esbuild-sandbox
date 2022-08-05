import $ from './lib/jquery.esm';
import { sum } from './add';
// require は @rollup/plugin-commonjs を使っても解消されない
// const sub = require('./sub.cjs').sub;

const a = sum(1, 2);
console.log(a);

// const b = sub(10 - 5);
// console.log(b);

$(() => {
  const btn = $('.myButton');
  btn.on('click', () => {
    console.log('clicked!');
  });
});

// iife だと return a になる
export default a;
