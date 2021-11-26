export default function arrayRotate(arr, reverse) {
    console.log("******arr",arr);
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    console.log("******arr",arr);
    return arr;
  }