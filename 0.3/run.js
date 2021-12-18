const fs = require("mz/fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
const parse = require(path.resolve(__dirname, "./src/parse"));
const generate = require(path.resolve(__dirname, "./src/generate"));

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("\x1b[1m\x1b[31mPlease provide a .baf file.\x1b[0m");
        return;
    }
    const astFilename = await parse.parseFile(filename);
    const jsFilename = await generate.generateFile(astFilename);

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
        process.stdout.write("\x1b[1m\x1b[31m", output.stderr);
    }
}

if (require.main === module) {
    main().catch(err => console.log(err.message));
}
