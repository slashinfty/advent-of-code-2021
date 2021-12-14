// test data
let input = [
    'NNCB',
    'CH -> B',
    'HH -> N',
    'CB -> H',
    'NH -> C',
    'HB -> C',
    'HC -> B',
    'HN -> C',
    'NN -> C',
    'BH -> H',
    'NC -> B',
    'NB -> B',
    'BN -> B',
    'BB -> N',
    'BC -> B',
    'CC -> N',
    'CN -> C'
];

// actual data (map at the end if necessary)
//const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: 
// expected outcome for test: 1588
const splice = () => {
    for (let i = 0; i < rules.reduce((a, b) => a + b.count, 0) - 1; i++) {
        let current = `${template.charAt(i)}${template.charAt(i + 1)}`;
        let index = rules.findIndex(r => r.pair === current);
        let insert = rules[index].insertion;
        [...current].forEach((char, j) => {
            let pair = `${j === 0 ? template.charAt(i) : insert}${j === 1 ? template.charAt(i + 1) : insert}`;
            let addIndex = rules.findIndex(r => r.pair === pair);
            rules[addIndex].add++;
        });
    }
    rules = rules.map(rule => ({
        'pair': rule.pair,
        'insertion': rule.insertion,
        'count': rule.count + rule.add,
        'add': 0
    }));
}

let template = input.shift();
let rules = input.map(i => ({
    'pair': i.slice(0, 2),
    'insertion': i.slice(-1),
    'count': 0,
    'add': 0
}));
for (let i = 0; i < template.length - 1; i++) {
    let current = `${template.charAt(i)}${template.charAt(i + 1)}`;
    let index = rules.findIndex(r => r.pair === current);
    rules[index].count++;
}
for (let i = 0; i < 10; i++) splice();
console.log(rules);
let solutionOne;
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: 
// expected outcome for test: 
let solutionTwo;
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
