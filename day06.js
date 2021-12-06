// test data
//let input = [3,4,3,1,2];

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean)[0].split(',').map(x => Number(x));

// part one work
// task: determine number of lantern fish if they spawn every 7 days (with newborns waiting 9) after 80 days
// expected outcome for test: 5934
let timer = [];
for (let i = 0; i < 9; i++) timer.push(input.reduce((a, b) => a + Number(b === i), 0));
for (let i = 0; i < 80; i++) {
    let genNew = timer[0];
    for (let i = 0; i < 8; i++) timer[i] = timer[i + 1];
    timer[6] += genNew;
    timer[8] = genNew;
}
let solutionOne = timer.reduce((a, b) => a + b, 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: same but after 256 days
// expected outcome for test: 26984457539
for (let i = 80; i < 256; i++) {
    let genNew = timer[0];
    for (let i = 0; i < 8; i++) timer[i] = timer[i + 1];
    timer[6] += genNew;
    timer[8] = genNew;
}
let solutionTwo= timer.reduce((a, b) => a + b, 0);
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);