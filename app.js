import SmlLexer from "./lexer.js";
import { string } from "./string.js";
const lexer = new SmlLexer('jsExpressionModule');
const startTime = performance.now()
lexer.ast(string) 
const endTime = performance.now()
const result = endTime - startTime;
console.log('time: ', result);
