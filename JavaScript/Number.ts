/**
 * roundNumber(5) => 5
 * roundNumber(5.424454466464) => 5.42
 * roundNumber(5.444444444) => 5.44
 * roundNumber(5.4) => 5.4
 * @param num 
 */
const roundNumber = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

randomInteger(1, 10); // -> 7