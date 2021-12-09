// test data
/*let input = [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: find all points that are local minimums relative to adjacent points
// expected outcome for test: 15
let localMinimums = [];
for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        let adjacents = [];
        if (c > 0) adjacents.push(Number(input[r][c - 1]));
        if (input[r][c + 1] !== undefined) adjacents.push(Number(input[r][c + 1]));
        if (r > 0) adjacents.push(Number(input[r - 1][c]));
        if (input[r + 1] !== undefined) adjacents.push(Number(input[r + 1][c]));
        if (Number(input[r][c]) < adjacents.reduce((a, b) => Math.min(a, b))) localMinimums.push({
            'val': Number(input[r][c]),
            'row': r,
            'col': c
        });
    }
}
let solutionOne = localMinimums.reduce((a, b) => a + b.val + 1, 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: find all non-9 values that connect to local minimums
// expected outcome for test: 1134
const checkpoint = (arr, point) => point.val < 9 && arr.find(p => p.row === point.row && p.col === point.col) === undefined;
const getAdjacents = (arr, point) => {
    let points = [];
    if (point.col > 0) {
        let pointLeft = {
            'val': Number(input[point.row][point.col - 1]),
            'row': point.row,
            'col': point.col - 1
        };
        if (checkpoint(arr, pointLeft)) points.push(pointLeft);
    }
    if (point.col < input[point.row].length - 1) {
        let pointRight = {
            'val': Number(input[point.row][point.col + 1]),
            'row': point.row,
            'col': point.col + 1
        }
        if (checkpoint(arr, pointRight)) points.push(pointRight);
    }
    if (point.row > 0) {
        let pointUp = {
            'val': Number(input[point.row - 1][point.col]),
            'row': point.row - 1,
            'col': point.col
        };
        if (checkpoint(arr, pointUp)) points.push(pointUp);
    }
    if (point.row < input.length - 1) {
        let pointDown = {
            'val': Number(input[point.row + 1][point.col]),
            'row': point.row + 1,
            'col': point.col
        };
        if (checkpoint(arr, pointDown)) points.push(pointDown);
    }
    return points;
}
let basinPoints = [];
let basinSizes = [];
localMinimums.forEach(min => {
    let basin = [min];
    let prevSize = 0;
    let newSize = 1;
    do {
        prevSize = newSize;
        let prevBasin = [...basin];
        prevBasin.forEach(pt => basin = basin.concat(getAdjacents(basin, pt)));
        newSize = basin.length;
    } while (prevSize !== newSize);
    let uniques = basin.filter(b => basinPoints.find(p => b.row === p.row && b.col === p.col) === undefined);
    basinSizes.push(uniques.length);
    basinPoints = basinPoints.concat(uniques);
});
let solutionTwo = basinSizes.sort((a, b) => b - a).filter((e, i) => i < 3).reduce((a, b) => a * b, 1);
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
