const Lexer = require('./Lexer');
const Parser = require('./Parser');
const IR = require('./IR');
const fs = require('fs');
const path = require('path');

const fileName = process.argv[2];
if (!fileName) {
  console.error("Please provide a .koss file");
  process.exit(1);
}

if (!fileName.endsWith(".koss")) {
  console.error("File must have .koss extension");
  process.exit(1);
}

try {
    const filePath = path.resolve(fileName);
    const code = fs.readFileSync(filePath, 'utf-8');

    // Lexer: Tokenise the code
    const myLexer = new Lexer(code);
    const tokens = myLexer.tokenize();
    
    // Parser: Parse and form AST
    const parser = new Parser(tokens);
    const ast = parser.parseProgram();
    
    // IR: Generate IR from AST
    const ir = (new IR(ast)).generate().join("\n");
    fs.writeFileSync("output.ir", ir);

} catch (err) {
    console.error(`Error: ${err.message}`);
}


