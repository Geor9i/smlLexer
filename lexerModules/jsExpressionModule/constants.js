export const tokens = {
  "(": { symbol: "(", type: "group", direction: "LTR", precedence: 1 },
  ")": { symbol: ")", type: "group", direction: "LTR", precedence: 1 },
  ".": { symbol: ".", type: "memberAccess", direction: "LTR", precedence: 2 },
  "[": {
    symbol: "[",
    type: "computedMemberAccess",
    direction: "LTR",
    precedence: 2,
  },
  "]": {
    symbol: "]",
    type: "computedMemberAccess",
    direction: "LTR",
    precedence: 2,
  },
  "!": [
      { symbol: "!==", type: "notTypeEquals", direction: "LTR", precedence: 9 },
      { symbol: "!=", type: "notEquals", direction: "LTR", precedence: 9 },
    { symbol: "!", type: "not", direction: "RTL", precedence: 4 },
  ],
  "+": [
      { symbol: "++", type: "increment", direction: "RTL", precedence: 3 },
      { symbol: "+=", type: "plusAssign", direction: "RTL", precedence: 14 },
    { symbol: "+", type: "unaryPlus", direction: "RTL", precedence: 4 },
    { symbol: "+", type: "addition", direction: "LTR", precedence: 7 },
  ],
  "-": [
      { symbol: "-=", type: "minusAssign", direction: "RTL", precedence: 14 },
      { symbol: "--", type: "decrement", direction: "RTL", precedence: 3 },
    { symbol: "-", type: "unaryMinus", direction: "RTL", precedence: 4 },
    { symbol: "-", type: "subtraction", direction: "LTR", precedence: 7 },
  ],
  "*": [
      { symbol: "**", type: "exponential", direction: "RTL", precedence: 5 },
      { symbol: "*=", type: "timesAssign", direction: "RTL", precedence: 14 },
    { symbol: "*", type: "multiplication", direction: "LTR", precedence: 6 },
  ],
  "/": [
      { symbol: "/=", type: "divideAssign", direction: "RTL", precedence: 14 },
    { symbol: "/", type: "division", direction: "LTR", precedence: 6 },
  ],
  "%": { symbol: "%", type: "remainder", direction: "LTR", precedence: 6 },
  "<": [
      { symbol: "<=", type: "lessEquals", direction: "LTR", precedence: 8 },
    { symbol: "<", type: "less", direction: "LTR", precedence: 8 },
  ],
  ">": [
      { symbol: ">=", type: "moreEquals", direction: "LTR", precedence: 8 },
    { symbol: ">", type: "more", direction: "LTR", precedence: 8 },
  ],
  "&": { symbol: "&&", type: "and", direction: "LTR", precedence: 10 },
  "|": { symbol: "||", type: "or", direction: "LTR", precedence: 11 },
  "^": { symbol: "^", type: "xor", direction: "LTR", precedence: 11 },
  "?": [
      { symbol: "??", type: "coalescing", direction: "LTR", precedence: 12 },
      { symbol: "?.", type: "optionalChaining", direction: "LTR", precedence: 2 },
    { symbol: "?", type: "ternery", direction: "RTL", precedence: 13 },
  ],
  ":": { symbol: ":", type: "colon", direction: "RTL", precedence: 13 },
  "=": [
      { symbol: "===", type: "typeEquals", direction: "LTR", precedence: 9 },
      { symbol: "==", type: "equals", direction: "LTR", precedence: 9 },
    { symbol: "=", type: "assign", direction: "RTL", precedence: 14 },
  ],
  ";": { symbol: ";", type: "semicolon", direction: null, precedence: 16 },
  "'": { symbol: "'", type: "quotes", direction: null, precedence: 16 },
  '"': { symbol: '"', type: "doubleQuotes", direction: null, precedence: 16 },
};

export const wordTokens = {
  delete: { symbol: 'delete', type: "delete", direction: "RTL", precedence: 4 },
  typeof: { symbol: 'typeof', type: "typeof", direction: "RTL", precedence: 4 },
  instanceof: { symbol: 'instanceof', type: "instanceof", direction: "LTR", precedence: 8 },
  in: { symbol: 'in', type: "in", direction: "LTR", precedence: 8 },
  of: { symbol: 'of', type: "of", direction: "LTR", precedence: 15 },
  true: { symbol: 'true', type: "true", direction: null, precedence: 16 },
  false: { symbol: 'false', type: "false", direction: null, precedence: 16 },
  null: { symbol: 'null', type: "null", direction: null, precedence: 16 },
  undefined: { symbol: 'undefined', type: "undefined", direction: null, precedence: 16 },
  let: { symbol: 'let', type: "let", direction: null, precedence: 16 },
  const: { symbol: 'const', type: "const", direction: null, precedence: 16 },
};
