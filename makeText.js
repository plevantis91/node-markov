/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const markov = require('./markov');

function generateText(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
    }

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeURLText(url) {
    let res;

    try {
        res = await axios.get(url);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
    generateText(res.data);
}

let [method, path] = process.argv.slice(2);

if (method === 'file') {
    makeText(path);
}
    
    else if (method === 'url') {
        makeURLText(path);
    }
    
    else {
        console.error(`Unknown method: ${method}`);
        process
        .exit(1);
    }
