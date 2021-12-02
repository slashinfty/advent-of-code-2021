// test data
/*let input = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: multiply final horizontal position and depth
// expected outcome for test: 150
let position = [0, 0];
input.forEach(command => {
    const value = Number(/(?<=\s)\d+$/.exec(command)[0]);
    if (command.startsWith('forward')) position[0] += value; // increase horizontal position
    else if (command.startsWith('down')) position[1] += value; // increate depth
    else if (command.startsWith('up')) position[1] -= value; // decrease depth
});
let solutionOne = position[0] * position[1];
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: multiply final horizontal position and depth
// expected outcome for test: 900
position = [0, 0];
let aim = 0;
input.forEach(command => {
    const value = Number(/(?<=\s)\d+$/.exec(command)[0]);
    if (command.startsWith('forward')) { // increase horizontal position and depth
        position[0] += value;
        position[1] += aim * value;
    }
    else if (command.startsWith('down')) aim += value; // increase aim
    else if (command.startsWith('up')) aim -= value; // decrease aim
});
let solutionTwo = position[0] * position[1];
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
