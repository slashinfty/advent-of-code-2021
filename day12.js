// test data
/*let input = [
    'dc-end',
    'HN-start',
    'start-kj',
    'dc-start',
    'dc-HN',
    'LN-dc',
    'HN-end',
    'kj-sa',
    'kj-HN',
    'kj-dc'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: 
// expected outcome for test: 19
let nodes = {};
input.forEach(line => {
    let points = line.split('-');
    if (points[0] !== 'end') {
        if (nodes[points[0]] === undefined) nodes[points[0]] = points[1] === 'start' ? [] : [points[1]];
        else if (points[1] !== 'start') nodes[points[0]].push(points[1]);
    }
    if (points[1] !== 'end') {
        if (nodes[points[1]] === undefined) nodes[points[1]] = points[0] === 'start' ? [] : [points[0]];
        else if (points[0] !== 'start') nodes[points[1]].push(points[0]);
    }
});
let completePaths = [];
let pathsToDo = nodes['start'].map(p => ['start', p]);
do {
    let paths = [...pathsToDo];
    pathsToDo = [];
    paths.forEach(path => {
        let lastNode = path[path.length - 1];
        for (let i = 0; i < nodes[lastNode].length; i++) {
            let p = nodes[lastNode][i];
            if (p === 'end') completePaths.push([...path, p]);
            else if (path.includes(p) && /^[a-z]+$/.test(p)) continue;
            else pathsToDo.push([...path, p]);
        }
    });
} while (pathsToDo.length > 0);
let solutionOne = completePaths.length;
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: 
// expected outcome for test: 103
let lowercaseNodes = Object.keys(nodes).filter(n => /^[a-z]+$/.test(n) && n !== 'start');
completePaths = [];
lowercaseNodes.forEach(ln => {
    pathsToDo = nodes['start'].map(p => ['start', p]);
    do {
        let paths = [...pathsToDo];
        pathsToDo = [];
        paths.forEach(path => {
            let lastNode = path[path.length - 1];
            for (let i = 0; i < nodes[lastNode].length; i++) {
                let p = nodes[lastNode][i];
                if (p === 'end') completePaths.push([...path, p]);
                else if (p === ln && path.reduce((a, b) => a + (b === ln), 0) === 1) pathsToDo.push([...path, p]);
                else if (path.includes(p) && /^[a-z]+$/.test(p)) continue;
                else pathsToDo.push([...path, p]);
            }
        });
    } while (pathsToDo.length > 0);
    completePaths = [...new Set(completePaths.map(p => JSON.stringify(p)))].map(p => JSON.parse(p));
});

let solutionTwo = completePaths.length;
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);