const nearley = require("nearley");
const grammar = require("./baf.js");
const fs = require("mz/fs");

async function main() {
    const srcname = process.argv[2]
    if (!srcname){
        console.log(`Error! ${srcname} does not exist!`)
        return
    }
    const code = (await fs.readFile(srcname)).toString()
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    parser.feed(code);
    if (parser.results.toString.length> 1){
        console.log("Error! ambigous grammar detected.")
    } else if (parser.results.length == 1) {
        const ast = parser.results[0]
        const outputFileName = srcname.replace(".baf", ".ast")
        await fs.writeFile(outputFileName, JSON.stringify(ast, null, "  "))
        console.log(`AST File: ${outputFileName}.`)
    } else {
        console.log("Error! no parser found.")
    }
}
main().catch(err => console.log(err.stack))