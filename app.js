import SmlLexer from "./lexer.js";

const lexer = new SmlLexer('jsExpressionModule');
lexer.ast(`5 ++ 2`) 
const expression = '5 + 6 - 2 * ( 9 - 8 )';