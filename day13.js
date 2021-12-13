// test data
/*let input = [
    '6,10',
    '0,14',
    '9,10',
    '0,3',
    '10,4',
    '4,11',
    '6,0',
    '6,12',
    '4,1',
    '0,13',
    '10,12',
    '3,4',
    '3,0',
    '8,4',
    '1,10',
    '2,14',
    '8,10',
    '9,0',
    'fold along y=7',
    'fold along x=5'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: reflect a set number of points over a line, and count how many points there are
// expected outcome for test: 17
const reflect = line => {
    let axis = /[xy](?=\=)/.exec(line)[0];
    let r = parseInt(/\d+$/.exec(line)[0]);
    points = [...new Set(points.map(p => JSON.stringify([
        axis === 'x' && p[0] > r ? 2 * r - p[0] : p[0],
        axis === 'y' && p[1] > r ? 2 * r - p[1] : p[1]
    ])))].map(p => JSON.parse(p)).filter(p => axis === 'x' ? p[0] < r : p[1] < r);
}

let points = input.filter(i => /^\d/.test(i)).map(i => i.split(',').map(x => parseInt(x)));
let folds = input.filter(i => i.startsWith('fold along'));

const firstFold = folds.shift();
reflect(firstFold);
let solutionOne = points.length;
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: reflect points over many lines, then print the resulting grid
/* expected outcome for test: 
#####
#...#
#...#
#...#
#####
*/
folds.forEach(fold => reflect(fold));
const xMax = points.reduce((a, b) => Math.max(a, b[0]), 0) + 1;
const yMax = points.reduce((a, b) => Math.max(a, b[1]), 0) + 1;
let grid = new Array(yMax).fill(new Array(xMax).fill('.').join(''));
points.forEach(p => {
    let row = grid[p[1]];
    let arr = row.split('');
    arr[p[0]] = '#';
    grid[p[1]] = arr.join('');
});

let solutionTwo = grid.join(`\n`);
console.log(`\nPart Two...\nSolution: \n${solutionTwo}`);
