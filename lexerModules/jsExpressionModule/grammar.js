

const BOUNDARY_OPERATORS = {
    OPEN_PARENTHESIS: {
        symbol: '(',
        precedence: 1,
        direction: 'LTR',
        type: 'OPEN_PARENTHESIS',
    },
    CLOSE_PARENTHESIS: {
        symbol: ')',
        precedence: 1,
        direction: 'LTR',
        type: 'CLOSE_PARENTHESIS',
    },
    OPEN_SQUARE_BRACKETS: {
        symbol: '[',
        precedence: 2,
        direction: 'LTR',
        type: 'OPEN_SQUARE_BRACKETS',
    },
    CLOSE_SQUARE_BRACKETS: {
        symbol: ']',
        precedence: 2,
        direction: 'LTR',
        type: 'CLOSE_SQUARE_BRACKETS',
    },
    OPEN_CURLY_BRACKETS: {
        symbol: '{',
        precedence: 2,
        direction: 'LTR',
        type: 'OPEN_CURLY_BRACKETS',
    },
    CLOSE_CURLY_BRACKETS: {
        symbol: '}',
        precedence: 2,
        type: 'CLOSE_CURLY_BRACKETS',
        direction: 'LTR',
    },
    MEMBER_ACCESS: {
        symbol: '.',
        precedence: 2,
        type: 'MEMBER_ACCESS',
        direction: 'LTR'
    },
    OPTIONAL_CHAINING: {
        symbol: '?.',
        precedence: 2,
        direction: 'LTR',
        type: 'OPTIONAL_CHAINING',
    },
        TERNARY: {
        symbol: '?',
        precedence: 13,
        direction: 'RTL',
        type: 'TERNARY',
    },
    QUOTE: {
        symbol: "'",
        precedence: 16,
        type: 'QUOTE',
    },
    DOUBLE_QUOTE: {
        symbol: '"',
        precedence: 16,
        type: 'DOUBLE_QUOTE',
    },
    COMMA: {
        symbol: ",",
        precedence: 16,
        type: 'COMMA',
    },
    SEMICOLON: {
        symbol: ";",
        precedence: 16,
        type: 'SEMICOLON',
    },
    COLON: {
        symbol: ":",
        precedence: 13,
        type: 'COLON',
    },
}

//? Base Values
const STRING = {
    identifier: ['"', "'"],
    content: 'string'
};

const BOOLEAN = {
    content: 'boolean'
};

const UNDEFINED = {
    content: 'undefined'
};

const NULL = {
    content: 'null'
};

const NUMBER = {
    content: 'number' 
};

const SYMBOL = {
    content: 'symbol' 
};

const PRIMITIVE_VALUE = [STRING, NUMBER, BOOLEAN, NULL, UNDEFINED, SYMBOL];

const OBJECT = {
    identifier: ["{", "}"],
    content: [{ key: PRIMITIVE_VALUE || OBJECT, value: PRIMITIVE_VALUE || OBJECT }]
};  

const BASE_VALUE = [...PRIMITIVE_VALUE, OBJECT];

//? Operators
const OPERATORS = {
    ADDITION: {
        symbol: '+',
        precedence: 7,
        direction: 'LTR',
        type: 'ADDITION'
    },
    SUBTRACTION: {
        symbol: '-',
        precedence: 7,
        direction: 'LTR',
        type: 'SUBTRACTION'
    },
    MULTIPLICATION: {
        symbol: '*',
        precedence: 6,
        direction: 'LTR',
        type: 'MULTIPLICATION'
    },
    DIVISION: {
        symbol: '/',
        precedence: 6,
        direction: 'LTR',
        type: 'DIVISION'
    },
    REMAINDER: {
        symbol: '%',
        precedence: 6,
        direction: 'LTR',
        type: 'REMAINDER'
    },
    EXPONENTIATION: {
        symbol: '**',
        precedence: 5,
        direction: 'RTL',
        type: 'EXPONENTIATION'
    },
    LESS_EQUALS: {
        symbol: '<=',
        precedence: 8,
        direction: 'LTR',
        type: 'LESS_EQUALS'
    },
    MORE_EQUALS: {
        symbol: '>=',
        precedence: 8,
        direction: 'LTR',
        type: 'MORE_EQUALS'
    },
    LESS: {
        symbol: '<',
        precedence: 8,
        direction: 'LTR',
        type: 'LESS'
    },
    MORE: {
        symbol: '>',
        precedence: 8,
        direction: 'LTR',
        type: 'MORE'
    },
    AND: {
        symbol: '&&',
        precedence: 10,
        direction: 'LTR',
        type: 'AND'
    },
    OR: {
        symbol: '||',
        precedence: 11,
        direction: 'LTR',
        type: 'OR'
    },
    XOR: {
        symbol: '^',
        precedence: 11,
        direction: 'LTR',
        type: 'XOR'
    },
    COALESCING: {
        symbol: '??',
        precedence: 12,
        direction: 'LTR',
        type: 'COALESCING'
    },
    COMPARISON: {
        symbol: '==',
        precedence: 9,
        direction: 'LTR',
        type: 'COMPARISON'
    },
    STRICT_COMPARISON: {
        symbol: '===',
        precedence: 9,
        direction: 'LTR',
        type: 'STRICT_COMPARISON'
    },
    NOT_EQUALS: {
        symbol: '!=',
        precedence: 9,
        direction: 'LTR',
        type: 'NOT_EQUALS'
    },
    STRICT_NOT_EQUALS: {
        symbol: '!==',
        precedence: 9,
        direction: 'LTR',
        type: 'STRICT_NOT_EQUALS'
    }
};

const ASSIGNMENT_OPERATORS = {
    ASSIGNMENT: {
        symbol: '=',
        precedence: 14,
        direction: 'RTL',
        type: 'ASSIGNMENT'
    },
    PLUS_ASSIGNMENT: {
        symbol: '+=',
        precedence: 14,
        direction: 'RTL',
        type: 'PLUS_ASSIGNMENT'
    },
    MINUS_ASSIGNMENT: {
        symbol: '-=',
        precedence: 14,
        direction: 'RTL',
        type: 'MINUS_ASSIGNMENT'
    },
    MULTIPLICATION_ASSIGNMENT: {
        symbol: '*=',
        precedence: 14,
        direction: 'RTL',
        type: 'MULTIPLICATION_ASSIGNMENT'
    },
    DIVISION_ASSIGNMENT: {
        symbol: '/=',
        precedence: 14,
        direction: 'RTL',
        type: 'DIVISION_ASSIGNMENT'
    },
    UNARY_PLUS: {
        symbol: '+',
        precedence: 4,
        direction: 'RTL',
        type: 'UNARY_PLUS'
    },
    UNARY_MINUS: {
        symbol: '-',
        precedence: 4,
        direction: 'RTL',
        type: 'UNARY_MINUS'
    },
    INCREMENT: {
        symbol: '++',
        precedence: 3,
        direction: 'RTL',
        type: 'INCREMENT'
    },
    DECREMENT: {
        symbol: '--',
        precedence: 3,
        direction: 'RTL',
        type: 'DECREMENT'
    },
    NOT: {
        symbol: '!',
        precedence: 4,
        direction: 'RTL',
        type: 'NOT'
    },
};



const BINARY_OPERATORS = [
    OPERATORS.ADDITION, OPERATORS.SUBTRACTION, OPERATORS.MULTIPLICATION, 
    OPERATORS.DIVISION, OPERATORS.EXPONENTIATION, OPERATORS.LESS_EQUALS, 
    OPERATORS.MORE_EQUALS, OPERATORS.LESS, OPERATORS.MORE, OPERATORS.AND, 
    OPERATORS.OR, OPERATORS.XOR, OPERATORS.COALESCING, OPERATORS.COMPARISON, 
    OPERATORS.STRICT_COMPARISON, OPERATORS.NOT_EQUALS, OPERATORS.STRICT_NOT_EQUALS
];

const UNARY_OPERATORS = [
    ASSIGNMENT_OPERATORS.UNARY_PLUS, ASSIGNMENT_OPERATORS.UNARY_MINUS, 
    ASSIGNMENT_OPERATORS.NOT
];

const WORD_OPERATORS = {
DELETE: {
    precedence: 4,
    type: 'DELETE',
    symbol: 'delete',
},
TYPEOF: {
    precedence: 4,
    type: 'TYPEOF',
    symbol: 'typeof',
},
INSTANCEOF: {
    precedence: 8,
    type: 'INSTANCEOF',
    symbol: 'instanceof',
},
IN: {
    precedence: 15,
    type: 'IN',
    symbol: 'in',
},
OF: {
    precedence: 15,
    type: 'OF',
    symbol: 'of',
},
TRUE: {
    precedence: 16,
    type: 'TRUE',
    baseType: BOOLEAN,
    symbol: 'true',
},
FALSE: {
    precedence: 16,
    type: 'FALSE',
    baseType: BOOLEAN,
    symbol: 'false',
},
NULL: {
    precedence: 16,
    type: 'NULL',
    baseType: NULL,
    symbol: 'null',
},
UNDEFINED: {
    precedence: 16,
    type: 'UNDEFINED',
    baseType: UNDEFINED,
    symbol: 'undefined',
},
LET: {
    precedence: 4,
    type: 'LET',
    symbol: 'let',
},
CONST: {
    precedence: 4,
    type: 'CONST',
    symbol: 'const',
},
VAR: {
    precedence: 4,
    type: 'VAR',
    symbol: 'var',
},
}

//? Expressions
const VALUE = {
    type: 'VALUE',
    content: BASE_VALUE
};

const UNARY_EXPRESSION = {
    type: 'UNARY_EXPRESSION',
    content: [{ operator: UNARY_OPERATORS, operand: VALUE }]
};

const BINARY_EXPRESSION = {
    type: 'BINARY_EXPRESSION',
    content: [{ left: VALUE, operator: BINARY_OPERATORS, right: VALUE }]
};

const EXPRESSION = {
    type: 'EXPRESSION',
    content: [VALUE, UNARY_EXPRESSION, BINARY_EXPRESSION]
};

//? Statements
const STATEMENT_OPERATORS = {
    FOR_LOOP: {
        type: 'FOR_LOOP',
        symbol: 'for',
        itterator: {
            OBJECT: {
                keyword: 'in'
            },
            ARRAY: {
                keyword: 'of'
            },
        },
    },
    WHILE_LOOP: {
        type: 'WHILE_LOOP',
        value: EXPRESSION,
        symbol: 'while',
        content: ['while', '(', 'value', ')', '{', 'STATEMENTS', '}'],
        execute: (expression) => expression === true,
    },
    IF_STATEMENT: {
        type: 'IF_STATEMENT',
        value: EXPRESSION,
        symbol: 'if',
        content: ['if', '(', 'value', ')', '{', 'STATEMENTS', '}'],
        execute: (expression) => expression === true,
    },
    ELSE_IF_STATEMENT: {
        type: 'ELSE_IF_STATEMENT',
        value: EXPRESSION,
        symbol: 'else',
        content: ['function', '(', 'value', ')', '{', 'STATEMENTS', '}'],
        execute: (expression) => expression === true,
    },
    ELSE_STATEMENT: {
        type: 'ELSE_STATEMENT',
        value: EXPRESSION,
        symbol: 'else',
        content: ['function', '(', 'value', ')', '{', 'STATEMENTS', '}'],
        execute: (expression) => expression === true,
    },
    SWITCH_STATEMENT: {
        type: 'SWITCH_STATEMENT',
        value: BASE_VALUE,
        symbol: 'switch',
        content: ['function', '(', 'value', ')', '{', 'STATEMENTS', '}'],
        cases: {},
        execute: (value) => cases[value]
    },
    FUNCTION_DECLARATION: {
        type: 'FUNCTION_DECLARATION',
        value: PARAMS,
        symbol: 'function',
        content: ['function', '(', 'value', ')', '{', 'STATEMENTS', '}']
    }
};

const FUNCTIONAL_OPERATORS = {
    ARROW_FUNCTION: {
        symbol: "=>",
        precedence: 4,
        direction: "LTR",
        type: 'ARROW_FUNCTION'
    },
}


const STATEMENT = {
    type: 'STATEMENT',
    content: [STATEMENT_OPERATORS, EXPRESSION, '{', EXPRESSION, '}']
};

//? Grouping
const GROUP = {
    type: 'GROUP',
    content: ['(', EXPRESSION, ')']
};

//? Arrays
const ARRAY = {
    type: 'ARRAY',
    content: ['[', VALUE, ',', VALUE, ']'] // Simplified
};

//? Function and Code Block


const CODE_BLOCK = {
    type: 'CODE_BLOCK',
    content: ['{', 'STATEMENTS', '}']
};

//? Grammar Definition
export const grammar = {
    VALUE,
    OPERATORS,
    ASSIGNMENT_OPERATORS,
    BOUNDARY_OPERATORS,
    WORD_OPERATORS,
    FUNCTIONAL_OPERATORS,
    STATEMENT_OPERATORS,
    UNARY_EXPRESSION,
    BINARY_EXPRESSION,
    EXPRESSION,
    STATEMENT,
    GROUP,
    ARRAY,
    FUNCTION_DECLARATION,
    CODE_BLOCK
};
