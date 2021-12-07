// test data
//let input = [16,1,2,0,4,2,7,1,2,14];

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean)[0].split(',').map(x => Number(x));

// part one work
// task: find the point that minimizes the sum of distances
// expected outcome for test: 37
input.sort((a, b) => a - b);
const median = (input[Math.ceil((input.length + 1) / 2) - 1] + input[Math.floor((input.length + 1) / 2) - 1]) / 2;
let solutionOne = input.reduce((a, b) => a + Math.abs(b - median), 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: part one, but each distance increases the cost
// expected outcome for test: 168
const lowMean = Math.floor(input.reduce((a, b) => a + b, 0) / input.length);
const highMean = Math.ceil(input.reduce((a, b) => a + b, 0) / input.length);
const lowDistance = input.reduce((a, b) => {
    let d = Math.abs(lowMean - b);
    return a + ((d * (d + 1)) / 2);
}, 0);
const highDistance = input.reduce((a, b) => {
    let d = Math.abs(highMean - b);
    return a + ((d * (d + 1)) / 2);
}, 0);
let solutionTwo = Math.min(lowDistance, highDistance);
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
