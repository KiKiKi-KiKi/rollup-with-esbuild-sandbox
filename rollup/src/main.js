import { sum } from './sum';
const { sub } = require('./sub.cjs.js');

const a = sum(1, 2);
console.log(a);

const b = sub(10, 5);
console.log(b);
