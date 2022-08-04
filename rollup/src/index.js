import $ from './lib/jquery.esm';
import { sum } from './add';

const a = sum(1, 2);
console.log(a);

$(() => {
  const btn = $('.myButton');
  btn.on('click', () => {
    console.log('clicked!');
  });
});

// iife だと return a になる
export default a;
