import { tokens } from './constants.js';
export default class JSExpressionModule {
    constructor() {
        this.symbols = new Set(['(',')','{','}','[',']',">","<","'",'"',".","!","?",",","-","_","\\","/","*","+","-",":",";","|","&","^","%"]);
        this.acceptsNumbers = true;
        this.acceptsLetters = true;
    }

    getToken(string) {
        const result = [];
        tokens.forEach(obj => {
            const symbols = [];
            for (let i = 0; i < obj.symbols.length; i++) {
                const symbol = obj.symbols[i];
                if (symbol.length > 1 && string.includes(symbol)) {
                    const index = string.indexOf(symbol);
                    symbols.push({symbol, startIndex: index, endIdex: index + symbol.length})
                    
                } else {
                    for(let j = 0; j < string.length;j++) {
                        const char = string[j];
                        if (char === symbol) {
                            symbols.push({symbol, startIndex: j, endIdex: j + symbol.length});
                        }
                    }
                }
            }
            if(symbols.length) {
                result.push({...obj, symbols})
            }
        })
        return result.length ? result : null;
    }

}