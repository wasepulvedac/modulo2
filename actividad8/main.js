'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var inputLines = [];
var currentLine = 0;
process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});
process.stdin.on('end', function () {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});
function readLine() {
    return inputLines[currentLine++];
}
/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function plusMinus(arr) {
    // Write your code here
    var negative = (arr.filter(function (i) { return i < 0; }).length / arr.length).toFixed(6);
    var zeros = (arr.filter(function (i) { return i == 0; }).length / arr.length).toFixed(6);
    var positive = (arr.filter(function (i) { return i > 0; }).length / arr.length).toFixed(6);
    process.stdout.write(negative);
    process.stdout.write("\n");
    process.stdout.write(zeros);
    process.stdout.write("\n");
    process.stdout.write(positive);
}
function main() {
    var n = parseInt(readLine().trim(), 10);
    var arr = readLine().replace(/\s+$/g, '').split(' ').map(function (arrTemp) { return parseInt(arrTemp, 10); });
    plusMinus(arr);
}
