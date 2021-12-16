// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lex = require('./lexer');
var grammar = {
    Lexer: lex,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess": 
        (data) => {
            return {
                type: "program",
                body: data[0]
            }
        }
            },
    {"name": "statements", "symbols": [], "postprocess": 
        () => []
            },
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        (data) => [data[0]]
            },
    {"name": "statements$ebnf$1", "symbols": [{"literal":"\r\n"}]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", {"literal":"\r\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_", "statement", "_", "statements$ebnf$1", "statements"], "postprocess": 
        (data) => [data[1], ...data[4]]
            },
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["function_call"], "postprocess": id},
    {"name": "statement", "symbols": ["function_definition"], "postprocess": id},
    {"name": "statement", "symbols": ["if_else_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "assignment", "symbols": [(lex.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expression"], "postprocess": 
        (data) => {
            return {
                type:     "assignment",
                var_name: data[0],
                value:    data[4]
            }
        }
            },
    {"name": "function_call", "symbols": [(lex.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "expression_list", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type:           "function_call",
                fun_name:       data[0],
                parameters:     data[4]
            }
        }
            },
    {"name": "function_definition", "symbols": [(lex.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "expression_list", "_", {"literal":")"}, "_", "code_block"], "postprocess": 
        (data) => {
            return {
                type:       "function_definition",
                fun_name:   data[0],
                parameters: data[4],
                body:       data[8]
            }
        }
            },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "_", {"literal":"["}, "_", "values", "_", "compare_op", "_", "values", "_", {"literal":"]"}, "_", "code_block", "_"], "postprocess": 
        (data) => {
            return {
                type:       "if_statement",
                condition:      data[4] + " " + data[6] + " " + data[8],
                if_body:        data[12],
            }
        }
            },
    {"name": "if_else_statement$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"else"}]},
    {"name": "if_else_statement$ebnf$1", "symbols": ["if_else_statement$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "if_else_statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_else_statement", "symbols": [{"literal":"if"}, "_", {"literal":"["}, "_", "values", "_", "compare_op", "_", "values", "_", {"literal":"]"}, "_", "code_block", "if_else_statement$ebnf$1", "_", "code_block", "_"], "postprocess": 
        (data) => {
            return {
                type:       "if_else_statement",
                condition:      data[4] + " " + data[6] + " " + data[8],
                if_body:        data[12],
                else_body:      data[15]
            }
        }
            },
    {"name": "compare_op", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "compare_op", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "values", "symbols": [(lex.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "values", "symbols": [(lex.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "values", "symbols": [(lex.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "values", "symbols": [(lex.has("neg_number") ? {type: "neg_number"} : neg_number)], "postprocess": id},
    {"name": "code_block", "symbols": [{"literal":"["}, "_", {"literal":"\r\n"}, "statements", "_", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
                type:       "code_block",
                statements: data[3]
            }
        }
            },
    {"name": "expression_list", "symbols": [], "postprocess": 
        () => []
            },
    {"name": "expression_list", "symbols": ["expression"], "postprocess": 
        (data) => {
            return [data[0]]
        }
            },
    {"name": "expression_list", "symbols": ["expression", "__", "expression_list"], "postprocess": 
        (data) => {
            return [data[0], ...data[2]]
        }
            },
    {"name": "expression", "symbols": [(lex.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "expression", "symbols": ["code_block"], "postprocess": id},
    {"name": "expression", "symbols": ["array_literal"], "postprocess": id},
    {"name": "literal", "symbols": [(lex.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(lex.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": ["function_call"], "postprocess": id},
    {"name": "literal", "symbols": [(lex.has("neg_number") ? {type: "neg_number"} : neg_number)], "postprocess": id},
    {"name": "array_literal", "symbols": [{"literal":"{"}, "_", "expression_list", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "array_literal",
                items: data[2]
            }
        }
            },
    {"name": "_nl$ebnf$1", "symbols": []},
    {"name": "_nl$ebnf$1", "symbols": ["_nl$ebnf$1", (lex.has("newLine") ? {type: "newLine"} : newLine)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_nl", "symbols": ["_nl$ebnf$1"]},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["__"]},
    {"name": "__", "symbols": [(lex.has("whiteSpace") ? {type: "whiteSpace"} : whiteSpace)]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
