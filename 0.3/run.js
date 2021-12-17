const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("\x1b[1m\x1b[31mPlease provide a .baf file.\x1b[0m");
        return;
    }
    const astFilename = filename + ".ast"
    const jsFilename = astFilename.replace(".baf.ast", ".js");
    await myExec(`node src/parse.js ${filename}`);
    await myExec(`node src/generate.js ${astFilename}`);
    //await myExec(`rm ${astFilename}`);
    console.log(`\x1b[36m\x1b[1mRunning File:   \x1b[32m\x1b[1m${jsFilename}...\x1b[1m\x1b[34m\r\n`)
    await myExec(`node ${jsFilename}`);
    //await myExec(`rm ${jsFilename}`)
    console.log("\x1b[0m");
}

async function myExec(command) {
    const output = await exec(command);
    if (output.stdout) {
        process.stdout.write(output.stdout);
    }
    if (output.stderr) {
        process.stdout.write("\x1b[1m\x1b[31m",output.stderr);
    }
}

main().catch(err => console.log(err.message));
