// test data
/*let input = [
    '5483143223',
    '2745854711',
    '5264556173',
    '6141336146',
    '6357385478',
    '4167524645',
    '2176841721',
    '6882881134',
    '4846848554',
    '5283751526'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: count the number of flashes (going greater than 9) for 100 steps
// expected outcome for test: 1656
let grid = input.map(line => line.split('').map(x => parseInt(x)));
let flashes = [];
let flashCount = 0;
let stepCount = 0;
let allFlash;
while (allFlash === undefined) {
    stepCount++;
    grid.forEach((row, y) => {
        row.forEach((val, x) => {
            row[x]++;
            if (row[x] === 10) flashes.push([x, y]);
        });
        grid[y] = row;
    });
    while (flashes.length > 0) {
        let pos = flashes.shift();
        if (stepCount < 101) flashCount++;
        let x = pos[0];
        let y = pos[1];
        for (let j = -1; j <= 1; j++) {
            if (y + j < 0 || y + j === grid.length) continue;
            let row = grid[y + j];
            for (let k = -1; k <= 1; k++) {
                if (x + k < 0 || x + k === row.length || (j === 0 && k === 0)) continue;
                row[x + k]++;
                if (row[x + k] === 10) flashes.push([x + k, y + j]);
            }
        }
    }
    if (allFlash === undefined && grid.every(row => row.reduce((a, b) => a && (b > 9), true))) allFlash = stepCount; 
    grid.forEach((row, y) => {
        row.forEach((val, x) => { if (val > 9) row[x] = 0; });
        grid[y] = row;
    });
}
let solutionOne = flashCount;
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: find the first step where all flash
// expected outcome for test: 195
let solutionTwo = allFlash;
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
