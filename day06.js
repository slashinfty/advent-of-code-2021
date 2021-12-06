// test data
let input = [3,4,3,1,2];

// actual data (map at the end if necessary)
//const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean)[0].split(',').map(x => Number(x));

// part one work
// task: 
// expected outcome for test: 5934
let fish = [...input];
let newFish = 0;
for (let i = 0; i < 80; i++) {
    let newFish = 0;
    fish = fish.map(f => {
        if (f === 0) {
            newFish++;
            return 6;
        } else return f - 1;
    }).concat(new Array(newFish).fill(8));
}
let solutionOne = fish.length;
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: 
// expected outcome for test: 26984457539
fish = [...input];
newFish = 0;
for (let i = 0; i < 256; i++) {
    let newFish = 0;
    fish = fish.map(f => {
        if (f === 0) {
            newFish++;
            return 6;
        } else return f - 1;
    }).concat(new Array(newFish).fill(8));
}
let solutionTwo = fish.length;
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
