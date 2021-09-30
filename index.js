const readline = require('readline');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');


async function parseInput(data) {
    parsedData = JSON.parse(data);
    keys = Object.keys(parsedData);
    if (!keys.includes('html') || !keys.includes('url')) {
        throw new SyntaxError('invalid JSON supplied');
    }
    return parsedData;
}

async function createReadability(data) {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);

    const clean = DOMPurify.sanitize(data.html);
    const cleanDOM = new JSDOM(clean, {url: data.url})

    let reader = new Readability(cleanDOM.window.document);
    let article = reader.parse()

    return article;
}

async function printParsed(data) {
    const json = JSON.stringify(data);
    process.stdout.write(json);
}

async function printError(e) {
    console.error(e);
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
    parseInput(input).then(createReadability).then(printParsed).catch(printError);
});
