// test data
/*let input = [
    'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
    'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
    'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
    'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
    'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
    'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
    'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
    'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
    'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
    'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
];*/

// actual data (map at the end if necessary)
const input =  require('fs').readFileSync(require('path').resolve(__dirname, `./inputs/${require('path').basename(__filename).replace('.js', '')}`), 'utf-8').split('\n').filter(Boolean);

// part one work
// task: given a pattern for 0-9 on a 7-segment display, determine how many times 1, 4, 7, and 8 occur
// expected outcome for test: 26
class Line {
    constructor(str) {
        let parts = str.split(/\s\|\s/);
        this.pattern = parts[0].split(/\s/);
        this.display = parts[1].split(/\s/);
        this.segments = new Array(7);
        
        this.segments[1] = this.pattern.find(p => p.length === 2);
        this.segments[4] = this.pattern.find(p => p.length === 4);
        this.segments[7] = this.pattern.find(p => p.length === 3);
        this.segments[8] = this.pattern.find(p => p.length === 7);
        this.pattern.filter(p => p.length === 5).forEach(p => {
            if ([...this.segments[1]].every(e => p.includes(e))) this.segments[3] = p;
            else if ([...p].reduce((a, b) => a + Number(this.segments[4].includes(b)), 0) === 3) this.segments[5] = p;
            else this.segments[2] = p;
        });
        this.pattern.filter(p => p.length === 6).forEach(p => {
            if ([...this.segments[4]].every(e => p.includes(e))) this.segments[9] = p;
            else if ([...this.segments[1]].some(e => !p.includes(e))) this.segments[6] = p;
            else this.segments[0] = p;
        });

        this.digits = [];
        this.display.forEach(d => {
            for (let i = 0; i < this.segments.length; i++) {
                let regex = new RegExp(`^[${this.segments[i]}]{${this.segments[i].length}}$`);
                if (regex.test(d)) {
                    this.digits.push(i);
                    break;
                }
            }
        });
    }
}
let lines = input.map(i => new Line(i));
let solutionOne = lines.reduce((a, b) => a + b.digits.reduce((c, d) => c + Number(d === 1 || d === 4 || d === 7 || d === 8), 0), 0);
console.log(`Part One...\nSolution: ${solutionOne}`);

// part two work
// task: part one, but instead add the 4-digit numbers
// expected outcome for test: 61229
let solutionTwo = lines.reduce((a, b) => a + Number(b.digits.join('')), 0);
console.log(`\nPart Two...\nSolution: ${solutionTwo}`);
