// create a map fn that takes an array and a tranform fn as an input and returns the transformed array as output

const arr = [1, 2, 3, 4, 5];

const ans = arr.map(function (i) {
    return i * 2;
});
console.log(ans);