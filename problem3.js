let sum = 1002; //assuming the sum to be 1002 , we can use somef function to reaad sum from input .
let x;
let y;
let lenX = [];
let lenSum = sum.toString().length;
for (let i = 2; i <= lenSum; i++) {
  if (i + 1 < lenSum) {
    continue;
  }
  lenX.push(i);
}
let matches = 0;
let matchedArray = [[]];
lenX.forEach(testValidity);

function testValidity(item, index) {
  let nums = [];
  let t = item - 2;
  let i = "10";
  let z = "99";
  for (let n = 0; n < t; n++) {
    i = i + "0";
    z = z + "9";
  }
  for (let m = parseInt(i); m <= parseInt(z); m++) {
    CheckSum(m);
  }
}
function CheckSum(num) {
  let other = [];
  let numString = num.toString();
  for (let i = 0; i < numString.length; i++) {
    localY = parseInt(removeByIndex(numString, i));

    let localSum = num + localY;

    if (localSum == sum) {
      matches++;

      matchedArray.push([num, localY]);
    }
  }
}
PrintResult();

function PrintResult() {
  let strs = [];

  matchedArray.forEach((val, index) => {
    let strToPrint = val[0] + " + " + val[1] + " = " + sum;
    if (isInArray(strToPrint, strs)) {
      matches--;
    } else {
      strs.push(strToPrint);
    }
  });
  print(matches, " pairs found");
  for (let i = 1; i < strs.length; i++) {
    print(strs[i]);
  }
}

function removeByIndex(str, index) {
  if (index == 0) {
    return str.slice(1);
  } else {
    return str.slice(0, index) + str.slice(index + 1, str.length);
  }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
