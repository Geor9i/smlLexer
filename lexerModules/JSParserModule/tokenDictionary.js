import { grammar } from "./grammar.js";
const { OPERATORS, ASSIGNMENT_OPERATORS, BOUNDARY_OPERATORS, FUNCTIONAL_OPERATORS, STATEMENT_OPERATORS, WORD_OPERATORS } = grammar;

grammar
export const symbolTokens = {
  "(": {"(": {...BOUNDARY_OPERATORS.OPEN_PARENTHESIS }},
  ")": {")": { ...BOUNDARY_OPERATORS.CLOSE_PARENTHESIS }},
  ".": { ".": { ...BOUNDARY_OPERATORS.MEMBER_ACCESS }},
  "[": {"[": {...BOUNDARY_OPERATORS.OPEN_SQUARE_BRACKETS }},
  "]": { "]": {...BOUNDARY_OPERATORS.CLOSE_SQUARE_BRACKETS }},
  "{": {"{": {...BOUNDARY_OPERATORS.OPEN_CURLY_BRACKETS }},
  "}": { "}": {...BOUNDARY_OPERATORS.CLOSE_CURLY_BRACKETS }},
  "%": { "%": { ...OPERATORS.REMAINDER }},
  "&": { "&&": { ...OPERATORS.AND }},
  "|": { "||": { ...OPERATORS.OR }},
  "^": { "^": { ...OPERATORS.XOR }},
  ":": { ":": { ...BOUNDARY_OPERATORS.COLON }},
  ";": { ";": { ...BOUNDARY_OPERATORS.SEMICOLON }},
  "'": { "'": { ...BOUNDARY_OPERATORS.QUOTE }},
  '"': { '"': { ...BOUNDARY_OPERATORS.DOUBLE_QUOTE}},
  ",": { ",": { ...BOUNDARY_OPERATORS.COMMA }},

  "!": {
    "!==" :{ ...OPERATORS.STRICT_NOT_EQUALS },
    "!=": { ...OPERATORS.NOT_EQUALS },
    "!": { ...ASSIGNMENT_OPERATORS.NOT },
  },
  "+": {
    "++": { ...ASSIGNMENT_OPERATORS.INCREMENT },
    "+=": { ...ASSIGNMENT_OPERATORS.PLUS_ASSIGNMENT },
    "+": [
          { ...ASSIGNMENT_OPERATORS.UNARY_PLUS },
          { ...OPERATORS.ADDITION }
        ],
  },
  "-": {
    "-=": { ...ASSIGNMENT_OPERATORS.MINUS_ASSIGNMENT },
    "--": { ...ASSIGNMENT_OPERATORS.DECREMENT },
    "-": [
      { ...ASSIGNMENT_OPERATORS.UNARY_MINUS },
      { ...OPERATORS.SUBTRACTION },
      ],
  },
  "*": {
    "**": { ...OPERATORS.EXPONENTIATION },
    "*=": { ...ASSIGNMENT_OPERATORS.MULTIPLICATION_ASSIGNMENT },
    "*": { ...OPERATORS.MULTIPLICATION },
  },
  "/": {
    "/=": { ...ASSIGNMENT_OPERATORS.DIVISION_ASSIGNMENT },
    "/": { ...OPERATORS.DIVISION },
  },
  "<": {
    "<=": { ...OPERATORS.LESS_EQUALS },
    "<": { ...OPERATORS.LESS },
  },
  ">": {
    ">=": { ...OPERATORS.MORE_EQUALS },
    ">": { ...OPERATORS.MORE },
  },
  "?": {
    "??": { ...OPERATORS.COALESCING },
    "?.": { ...BOUNDARY_OPERATORS.OPTIONAL_CHAINING },
    "?": { ...BOUNDARY_OPERATORS.TERNARY },
  },
  "=": {
    "===": { ...OPERATORS.STRICT_COMPARISON },
    "==": { ...OPERATORS.COMPARISON },
    "=>": { ...FUNCTIONAL_OPERATORS.ARROW_FUNCTION },
    "=": { ...ASSIGNMENT_OPERATORS.ASSIGNMENT },
  },
};

export const wordTokens = {
  function: { ...STATEMENT_OPERATORS.FUNCTION_DECLARATION },
  delete: { ...WORD_OPERATORS.DELETE },
  typeof: { ...WORD_OPERATORS.TYPEOF },
  instanceof: { ...WORD_OPERATORS.INSTANCEOF },
  in: { ...WORD_OPERATORS.IN },
  of: { ...WORD_OPERATORS.OF },
  true: { ...WORD_OPERATORS.TRUE},
  false: { ...WORD_OPERATORS.FALSE },
  null: { ...WORD_OPERATORS.NULL },
  undefined: { ...WORD_OPERATORS.UNDEFINED },
  let: { ...WORD_OPERATORS.LET },
  const: { ...WORD_OPERATORS.CONST },
  var: { ...WORD_OPERATORS.VAR },
};

