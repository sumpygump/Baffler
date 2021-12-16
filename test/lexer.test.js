const fs = require('mz/fs').promises;
const lexer = require('../src/lexer');

async function main() {
    const filename = process.argv[2];
    if (!filename){
        console.log('Please provide a filename to lex.');
        return;
    }
    const code = (await fs.readFile(filename)).toString();
    lexer.reset(code);
    while (true){
        const token = lexer.next();
        if (!token){
            break;
        } else {
            console.log(`{ ${token.type} : ${JSON.stringify(token.value)} }`)
        }
    }
    
}
main().catch(err => console.log(err.stack))