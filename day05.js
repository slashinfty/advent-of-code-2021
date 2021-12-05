// test data
/*let input = [
    '0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: determine at how many points vertical and horizontal lines intersect
// expected outcome for test: 5
class Segment {
    constructor(str) {
        let arr = str.split(/\s->\s/);
        this.start = arr[0].split(',').map(x => Number(x));
        this.end = arr[1].split(',').map(x => Number(x));
        this.rise = this.end[1] - this.start[1];
        this.run = this.end[0] - this.start[0];
        for (let i = Math.min(Math.abs(this.rise), Math.abs(this.run)); Math.abs(i) > 1; i < 0 ? i++ : i--) {
            if (this.rise % i !== 0 || this.run % i !== 0) continue;
            this.rise /= i;
            this.run /= i;
            i = Math.min(this.rise, this.run);
        }
        if (this.rise === 0) this.run /= Math.abs(this.run);
        if (this.run === 0) this.rise /= Math.abs(this.rise);
        this.points = [];
        let point = [...this.start];
        do {
            this.points.push([...point]);
            point[0] += this.run;
            point[1] += this.rise;
        } while (point[0] !== this.end[0] || point[1] !== this.end[1]);
        this.points.push(this.end);
    }
}
const countDupes = arr => {
    let dupeCount = 0;
    for (let i = 0; i < arr.length - 1;) {
        let k = 1;
        if (JSON.stringify(arr[i]) === JSON.stringify(arr[i + k])) {
            dupeCount++;
            do {
                k++;
            } while (JSON.stringify(arr[i]) === JSON.stringify(arr[i + k]));
        }
        i += k;
    }
    return dupeCount;
}
let segments = input.map(i => new Segment(i));
let allPoints = segments.filter(s => s.rise === 0 || s.run === 0).reduce((a, b) => a = a.concat(b.points), []).sort((a, b) => a[1] - b[1]).sort((a, b) => a[0] - b[0]);
let solutionOne = countDupes(allPoints);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: determine at how many points vertical, horizontal, and diagonal lines intersect
// expected outcome for test: 12
allPoints = segments.filter(s => s.rise === 0 || s.run === 0 || Math.abs(s.rise) === Math.abs(s.run)).reduce((a, b) => a = a.concat(b.points), []).sort((a, b) => a[1] - b[1]).sort((a, b) => a[0] - b[0]);
let solutionTwo = countDupes(allPoints);
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
