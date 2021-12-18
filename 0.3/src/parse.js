const fs = require('mz/fs').promises;
const grammar = require('./baf');
const nearley = require('nearley');
const path = require('path')

/**
 * Parse a .baf file and generate AST structure file
 */
async function parseFile(filename) {
    const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);
    if (parser.results.length > 1){
        console.log(`Warning! parse tree has generated multiple results!`);
        console.log(parser.results);
    } else if (parser.results.length === 0){
        console.error(`\x1b[1m\x1b[31mError! Unexpected end of file!\x1b[0m`);
        process.exit(1);
    }

    const astFilename = filename + ".ast";
    const ast = parser.results[0];
    (await fs.writeFile(astFilename, JSON.stringify(ast, null, "    ")));
    return astFilename;
}

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log('Please provide a file to parse!');
        return;
    }

    astFilename = await parseFile(filename);
    console.log(`\x1b[36m\x1b[1mParsed File:    \x1b[32m${filename}!\x1b[0m`);
}

if (require.main === module) {
    main().catch(err => console.log(err.stack));
}

module.exports = { parseFile }
