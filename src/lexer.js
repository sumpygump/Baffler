const moo = require('moo');

module.exports = moo.compile({
    newLine:        { match: /\r\n/, lineBreaks: true },
    whiteSpace:     /[ \t]+/,
    number:         {match: /0|[1-9][0-9]*/, value: Number},
    string:         /"(?:\\["\\]|[^\n"\\])*"/,
    identifier:     /[a-zA-Z_][a-zA-Z_0-9]*/,
    lParen:         '(',
    rParen:         ')',
    lSquare:        '[',
    rSquare:        ']',
    assign:         "=",
    greaterThan:    ">",
    lessThan:       "<",
    comment:        /\/\/.*?$/, 
    
})