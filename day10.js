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
let incompleteScores = [];
input.forEach(x => {
    let inputs = x.split('');
    let opens = [];
    let corrupt = false;
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
                corrupt = true;
                break;
            }
        }
    }
    if (!corrupt) {
        let score = 0;
        for (let i = opens.length - 1; i > -1; i--) {
            score *= 5;
            if (opens[i] === '(') score += 1;
            else if (opens[i] === '[') score += 2;
            else if (opens[i] === '{') score += 3;
            else if (opens[i] === '<') score += 4;
        }
        incompleteScores.push(score);
    }
});
let solutionOne = corruptCharacters.reduce((a, b) => a += b === ')' ? 3 : b === ']' ? 57 : b === '}' ? 1197 : 25137, 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: 
// expected outcome for test: 288957
let solutionTwo = incompleteScores.sort((a, b) => b - a)[(incompleteScores.length - 1) / 2];
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
