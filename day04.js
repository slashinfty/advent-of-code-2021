// test data
/*let input = [
    '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
    '22 13 17 11  0',
    '8  2 23  4 24',
    '21  9 14 16  7',
    '6 10  3 18  5',
    '1 12 20 15 19',
    '3 15  0  2 22',
    '9 18 13 17  5',
    '19  8  7 25 23',
    '20 11 10 24  4',
    '14 21 16 12  6',
    '14 21 17 24  4',
    '10 16 15  9 19',
    '18  8 23 26 20',
    '22 11 13  6  5',
    '2  0 12  3  7'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: find first bingo board to win and multiply unmarked numbers by winning number
// expected outcome for test: 4512
let calls = input.shift().split(',').map(i => Number(i));

class Board {
    constructor(arr) {
        this.rows = arr.map(a => a.split(/\s+/).map(e => Number(e.trim())));
        this.cols = [];
        for (let i = 0; i < 5; i++) {
            let a = [];
            this.rows.forEach(r => a.push(r[i]));
            this.cols.push(a);
        }
    }

    mark(num) {
        this.rows.forEach(r => {
            let index = r.findIndex(i => i === num);
            if (index > -1) r.splice(index, 1);
        });
        this.cols.forEach(c => {
            let index = c.findIndex(i => i === num);
            if (index > -1) c.splice(index, 1);
        })
    }

    check() {
        return this.rows.some(r => r.length === 0) || this.cols.some(c => c.length === 0);
    }

    sum() {
        return this.rows.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0);
    }
}

let boards = [];
for (let i = 0; i < input.length; i += 5) {
    boards.push(new Board(input.slice(i, i + 5)));
}
let solutionOne;
firstWinner: for (let i = 0; i < calls.length; i++) {
    let call = calls[i];
    for (let k = 0; k < boards.length; k++) {
        let board = boards[k];
        board.mark(call);
        if (board.check()) {
            solutionOne = board.sum() * call;
            break firstWinner;
        }
    }
}
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: find last board to win and multiply unmarked numbers by winning number
// expected outcome for test: 1924
boards = [];
for (let i = 0; i < input.length; i += 5) {
    boards.push(new Board(input.slice(i, i + 5)));
}
let solutionTwo;
lastWinner: for (let i = 0; i < calls.length; i++) {
    let call = calls[i];
    for (let k = 0; k < boards.length; k++) {
        let board = boards[k];
        board.mark(call);
        if (board.check()) {
            if (boards.length !== 1) {
                boards.splice(k, 1);
                k--;
            } else {
                solutionTwo = board.sum() * call;
                break lastWinner;
            }
        }
    }
}
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
