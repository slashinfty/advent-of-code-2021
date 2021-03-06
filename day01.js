// test data
//let input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean).map(e => parseInt(e));

// part one work
// task: count the number of times a depth measurement increases from the previous measurement.
// expected outcome for test: 7
let solutionOne = input.reduce((a, b, i) => a + (i > 0 && b > input[i - 1]), 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: consider sums of a three-measurement sliding window, and count the number of times the sum of measurements in this sliding window increases from the previous sum
// expected outcome for test: 5
let solutionTwo = input.reduce((a, b, i) => a + (i > 2 && b > input[i - 3]), 0);
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
