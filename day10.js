// test data
/*let input = [
    '[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: 
// expected outcome for test: 26397
let corruptCharacters = [];
let incompleteLines = [];
input.forEach(x => {
    let inputs = x.split('');
    let opens = [];
    for (let i = 0; i < inputs.length; i++) {
        if (/[\(\[\{\<]/.test(inputs[i])) opens.push(inputs[i]);
        else {
            let lastOpen = opens.pop();
            if (
                (lastOpen === '(' && inputs[i] === ')') ||
                (lastOpen === '[' && inputs[i] === ']') ||
                (lastOpen === '{' && inputs[i] === '}') ||
                (lastOpen === '<' && inputs[i] === '>')
            ) continue;
            else {
                corruptCharacters.push(inputs[i]);
                break;
            }
        }
    }
});
let solutionOne = corruptCharacters.reduce((a, b) => a += b === ')' ? 3 : b === ']' ? 57 : b === '}' ? 1197 : 25137, 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: 
// expected outcome for test: 
let solutionTwo;
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
