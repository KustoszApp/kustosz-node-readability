const readline = require('readline');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');


async function parseInput(data) {
    return data;
}

async function createReadability(data) {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);

    const clean = DOMPurify.sanitize(data);

    let reader = new Readability(new JSDOM(clean).window.document);
    let article = reader.parse()

    return article;
}

async function printParsed(data) {
    const json = JSON.stringify(data);
    process.stdout.write(json);
}


let inputLines = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => inputLines.push(line));
rl.on('close', () => {
    let input = inputLines.join("\n");
    parseInput(input).then(createReadability).then(printParsed);
});
