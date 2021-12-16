const fs = require("mz/fs").promises;

const runtime = `const std = require("C:/Users/robot/DEV/baffler/0.0.2/src/runtime.js")`

async function main() {
    const filename = process.argv[2];
    if (!filename){
        console.log(`Please provide a filename!`);
        return;
    }
    const astCode = (await fs.readFile(filename)).toString();
    const ast = JSON.parse(astCode);
    const jsCode = runtime + "\r\n\r\n" + generate(ast);
    const jsFilename = filename.replace(".baf.ast", ".js");
    (await fs.writeFile(jsFilename, jsCode));
    console.log(`\x1b[36m\x1b[1mGenerated File: \x1b[32m${jsFilename}!\x1b[0m`)
}


function generate(node) {
    if (node.type === "program"){
        return node.body.map(generate).join(";\r\n") + ";";
    } else if (node.type === "assignment"){
        const varName = node.var_name.value;
        const value = generate(node.value);
        return `let ${varName} = ${value}`;
    } else if (node.type === "function_call"){
        if (node.fun_name.value === ("disp") || node.fun_name.value === "mul" || node.fun_name.value === "add" || node.fun_name.value === "div" || node.fun_name.value === "sub" || node.fun_name.value === "pow" || node.fun_name.value === "mod" ) {
            const funName = "std." + node.fun_name.value;
            const params = node.parameters.map(generate).join(", ");
            return `${funName}(${params})`;
        } else {
            const funName = node.fun_name.value;
            const params = node.parameters.map(generate).join(", ");
            return `${funName}(${params})`;
        }
    } else if (node.type === "if_else_statement") {
        const if_body = node.if_body.statements.map(generate).join(";\r\n") + ";";
        const indentedIfBody = if_body.split("\r\n").map(line => "\t" + line).join("\r\n");
        const else_body = node.else_body.statements.map(generate).join(";\r\n") + ";";
        const indentedElseBody = else_body.split("\r\n").map(line => "\t" + line).join("\r\n");
        const statment = node.condition.split(" ");
        return `if (${statment[0]} ${statment[1]} ${statment[2]}) {\r\n${indentedIfBody}\r\n} else {\r\n${indentedElseBody}\r\n}`
    } else if (node.type === "if_statement") {
        const cond = node.condition[2];
        const body = node.if_body.statements.map(generate).join(";\r\n") + ";";
        const indentedBody = body.split("\r\n").map(line => "\t" + line).join("\r\n");
        return `if (${node.condition[0]} ${cond} ${node.condition[4]}){\r\n${indentedBody}\r\n}`
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "array_literal") {
        const items = node.items.map(generate).join(", ");
        return `[${items}]`
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "number") {
        return node.value;
    } else if (node.type === "function_definition") {
        const funName = node.fun_name.value;
        const params = node.parameters.map(generate).join(", ");
        const body = node.body.statements.map(generate).join(";\r\n") + ";";
        const indentedBody = body.split("\r\n").map(line => "\t" + line).join("\r\n");
        return `function ${funName}(${params}) {\r\n${indentedBody}\r\n}`;
    } else {
        throw new Error(`Unkown node type: ${node.type}.`)
    }
}

main().catch(err => console.log(err.stack));