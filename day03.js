// test data
/*let input = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: multiply gamma rate (most common bits) and epsilon rate (least common bits)
// expected outcome for test: 198
let bitCount = new Array(input[0].length).fill(0);
input.forEach(e => e.split('').forEach((el, i) => bitCount[i] += Number(el)));
let gammaArray = bitCount.map(e => Number(e > input.length / 2));
let gamma = parseInt(gammaArray.join(''), 2);
let epsilonArray = gammaArray.map(e => Number(!e));
let epsilon = parseInt(epsilonArray.join(''), 2);
let solutionOne = gamma * epsilon;
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: filter input most common bit in each position (and least common bit) and multiply the results
// expected outcome for test: 230
let oxygenArray = [...input];
let co2Array = [...input];
bitCount = 0;
for (let i = 0; i < input[0].length; i++) {
    bitCount = oxygenArray.reduce((a, b) => a + Number(b[i]), 0);
    oxygenArray = oxygenArray.filter(e => Number(e.charAt(i)) === Number(bitCount >= oxygenArray.length / 2));
    if (oxygenArray.length === 1) break;
}
for (let i = 0; i < input[0].length; i++) {
    bitCount = co2Array.reduce((a, b) => a + Number(b[i]), 0);
    co2Array = co2Array.filter(e => Number(e.charAt(i)) === Number(!(bitCount >= co2Array.length / 2)));
    if (co2Array.length === 1) break;
}
let oxygen = parseInt(oxygenArray[0], 2);
let co2 = parseInt(co2Array[0], 2);
let solutionTwo = oxygen * co2;
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
