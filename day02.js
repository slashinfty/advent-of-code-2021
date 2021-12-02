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
    position[0] += command.startsWith('f') ? value : 0;
    position[1] += command.startsWith('d') ? value : command.startsWith('u') ? -value : 0;
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
    aim += command.startsWith('d') ? value : command.startsWith('u') ? -value : 0;
    position[0] += command.startsWith('f') ? value : 0;
    position[1] += command.startsWith('f') ? value * aim : 0;
});
let solutionTwo = position[0] * position[1];
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
