import { arrayFiltering } from './task06.mjs';
const toFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const res = arrayFiltering(toFilter, function (value) {
return value % 3 === 0;
});
console.log(res);