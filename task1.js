function findTheOddOne(arr) {
  let temp = [];
  temp = arr.filter((x) => {
    // returns odd number
    return x % 2 != 0;
  });
  if (temp.length > 1 || temp.length == 0) {
    //if odd numbers are not present or more than one odd number is present
    temp = arr.filter((x) => {
      // returns even number
      return x % 2 == 0;
    });
  }
  if (temp.length > 1 || temp.length == 0) {
    // if there are more than one even number
    return [];
  }
  return temp;
}
// let arr = [8, 2, 0, 200, 12, 6, 1602, 32];
let arr = [172, 71, 2599, 19, 17, 13, -61];
// let arr = [];
let result = findTheOddOne(arr);
console.log(result);
