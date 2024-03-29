import $ from './lib/jquery.esm';
import { sum } from './sum';
// import が存在すると require は @rollup/plugin-commonjs を使っても解消されない
// const sub = require('./sub.cjs').sub;

const sleep = (s = 1000) => new Promise((resolve) => setTimeout(resolve, s));

const asyncFunc = async () => {
  await sleep(100);
  const a = sum(1, 2);
  console.log(a);
};

const a = asyncFunc();

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
