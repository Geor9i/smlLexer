export const tokens = {
  "(": {"(": {type: "group", direction: "LTR", precedence: 1}},
  ")": {")": { type: "group", direction: "LTR", precedence: 1 }},
  ".": { ".": { type: "memberAccess", direction: "LTR", precedence: 2 }},
  "[": {"[": {type: "computedMemberAccess", direction: "LTR", precedence: 2, }},
  "]": { "]": { type: "computedMemberAccess", direction: "LTR", precedence: 2,}},
  "%": { "%": { type: "remainder", direction: "LTR", precedence: 6 }},
  "&": { "&&": { type: "and", direction: "LTR", precedence: 10 }},
  "|": { "||": { type: "or", direction: "LTR", precedence: 11 }},
  "^": { "^": { type: "xor", direction: "LTR", precedence: 11 }},
  ":": { ":": { type: "colon", direction: "RTL", precedence: 13 }},
  ";": { ";": { type: "semicolon", direction: null, precedence: 16 }},
  "'": { "'": { type: "quotes", direction: null, precedence: 16 }},
  '"': { '"': { type: "doubleQuotes", direction: null, precedence: 16 }},

  "!": {
    "!==" :{ type: "notTypeEquals", direction: "LTR", precedence: 9 },
    "!=": { type: "notEquals", direction: "LTR", precedence: 9 },
    "!": { type: "not", direction: "RTL", precedence: 4 },
  },
  "+": {
    "++": { type: "increment", direction: "RTL", precedence: 3 },
    "+=": { type: "plusAssign", direction: "RTL", precedence: 14 },
    "+": [
          { type: "unaryPlus", direction: "RTL", precedence: 4 },
          { type: "addition", direction: "LTR", precedence: 7 }
        ],
  },
  "-": {
    "-=": { type: "minusAssign", direction: "RTL", precedence: 14 },
    "--": { type: "decrement", direction: "RTL", precedence: 3 },
    "-": [
      { type: "unaryMinus", direction: "RTL", precedence: 4 },
      { type: "subtraction", direction: "LTR", precedence: 7 },
      ],
  },
  "*": {
    "**": { type: "exponential", direction: "RTL", precedence: 5 },
    "*=": { type: "timesAssign", direction: "RTL", precedence: 14 },
    "*": { type: "multiplication", direction: "LTR", precedence: 6 },
  },
  "/": {
    "/=": { type: "divideAssign", direction: "RTL", precedence: 14 },
    "/": { type: "division", direction: "LTR", precedence: 6 },
  },
  "<": {
    "<=": { type: "lessEquals", direction: "LTR", precedence: 8 },
    "<": { type: "less", direction: "LTR", precedence: 8 },
  },
  ">": {
    ">=": { type: "moreEquals", direction: "LTR", precedence: 8 },
    ">": { type: "more", direction: "LTR", precedence: 8 },
  },
  "?": {
    "??": { type: "coalescing", direction: "LTR", precedence: 12 },
    "?.": { type: "optionalChaining", direction: "LTR", precedence: 2 },
    "?": { type: "ternery", direction: "RTL", precedence: 13 },
  },
  "=": {
    "===": { type: "typeEquals", direction: "LTR", precedence: 9 },
    "==": { type: "equals", direction: "LTR", precedence: 9 },
    "=": { type: "assign", direction: "RTL", precedence: 14 },
  },
};

export const wordTokens = {
  function: { type: "function", direction: "RTL", precedence: 4 },
  delete: { type: "delete", direction: "RTL", precedence: 4 },
  typeof: { type: "typeof", direction: "RTL", precedence: 4 },
  instanceof: { type: "instanceof", direction: "LTR", precedence: 8 },
  in: { type: "in", direction: "LTR", precedence: 8 },
  of: { type: "of", direction: "LTR", precedence: 15 },
  true: { type: "true", direction: null, precedence: 16 },
  false: { type: "false", direction: null, precedence: 16 },
  null: { type: "null", direction: null, precedence: 16 },
  undefined: { type: "undefined", direction: null, precedence: 16 },
  let: { type: "let", direction: null, precedence: 16 },
  const: { type: "const", direction: null, precedence: 16 },
  var: { type: "var", direction: null, precedence: 16 },
};
