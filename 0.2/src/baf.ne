@{%
const lex = require('./lexer');
%}

@lexer lex

program
    -> statements
    {%
        (data) => {
            return {
                type: "program",
                body: data[0]
            }
        }
    %}

statements
    -> null
    {%
        () => []
    %}
    |  statement 
    {%
        (data) => [data[0]]
    %}
    |  _ statement _ "\r\n":+ statements
    {%
        (data) => [data[1], ...data[4]]
    %}
    | "\r\n":* statements 
    {% 
        (data) => data[2]
    %}

statement
    -> assignment           {% id %}
    |  function_call        {% id %}
    |  function_definition  {% id %}
    |  if_else_statement    {% id %}
    |  if_statement         {% id %}

assignment -> %identifier _ "=" _ expression
    {%
        (data) => {
            return {
                type:     "assignment",
                var_name: data[0],
                value:    data[4]
            }
        }
    %}

#doIt(a b c)
function_call -> %identifier _ "(" _ expression_list _ ")"
    {%
        (data) => {
            return {
                type:           "function_call",
                fun_name:       data[0],
                parameters:     data[4]
            }
        }
    %}

# doIt(a b c) [
#   ...
#]
function_definition -> %identifier _ "(" _ expression_list _ ")" _ code_block
    {%
        (data) => {
            return {
                type:       "function_definition",
                fun_name:   data[0],
                parameters: data[4],
                body:       data[8]
            }
        }
    %}

if_statement -> "if" _ "[" _ values _ compare_op _ values _ "]" _ code_block _ 
    {%
        (data) => {
            return {
                type:       "if_statement",
                condition:      data[4] + " " + data[6] + " " + data[8],
                if_body:        data[12],
            }
        }
    %}

if_else_statement -> "if" _ "[" _ values _ compare_op _ values _ "]" _ code_block (_ "else"):? _ code_block _
    {%
        (data) => {
            return {
                type:       "if_else_statement",
                condition:      data[4] + " " + data[6] + " " + data[8],
                if_body:        data[12],
                else_body:      data[15]
            }
        }
    %}

compare_op 
    -> ">"  {% id %}
    |  "<"  {% id %}

values
    -> %identifier  {% id %}
    |  %string      {% id %}
    |  %number      {% id %}

code_block -> "[" _ "\r\n" statements _ "]"
    {%
        (data) => {
            return {
                type:       "code_block",
                statements: data[3]
            }
        }
    %}

expression_list
    -> null
    {%
        () => []
    %}
    | expression 
    {%
        (data) => {
            return [data[0]]
        }
    %}
    |  expression __ expression_list
    {%
        (data) => {
            return [data[0], ...data[2]]
        }
    %}

expression
    -> %identifier      {% id %} 
    |  literal          {% id %}
    |  function_call    {% id %}
    |  code_block       {% id %}
    |  array_literal    {% id %}
    
literal 
    -> %number          {% id %}
    |  %string          {% id %}
    |  function_call    {% id %}

array_literal -> "{" _ expression_list _ "}"
    {%
        (data) => {
            return {
                type: "array_literal",
                items: data[2]
            }
        }
    %}
    
# Optional White space: " "
_ 
    ->  null
    |   __

# Required White space: " "
__ ->   %whiteSpace