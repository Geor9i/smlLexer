import { util } from '../../util.js';
import { tokens, wordTokens } from './constants.js';
export default class JSExpressionModule {
    constructor() {
        this.tokens = tokens;
        this.wordTokens = wordTokens;
        this.acceptsNumbers = true;
        this.acceptsLetters = true;
        this.cache = {};
    }

    getTokens(inputString) {

        //Process words from symbols
        if (this.cache.hasOwnProperty(inputString)) {
            return this.cache[inputString];
        }
        let charArr = inputString.split('');
        const tokensArr = [];
        let chunks = [];
        let startIndex = 0;
        let processingWords = false;
        
        for (let i = 0; i < charArr.length;i++) {
            let char = charArr[i];
            const currentCharType = util.charType(char);
            if (currentCharType === 'letter' || (currentCharType === 'number' && (processingWords || (util.charType(charArr[i + 1]) !== null)))) { 
                if (!processingWords) {
                    processingWords = true;
                    i > 0 && chunks.push({string: charArr.slice(startIndex, i).join(''), startIndex, endIndex: Math.max(0, i - 1), isWord: false});
                    startIndex = i;
                }
            } else {
                if(!this.tokens.hasOwnProperty(char) && currentCharType !== 'number' && currentCharType !== 'letter') {
                    throw new Error(`"${char}" is not a known token!`)
                }
                if (processingWords) {
                    processingWords = false;
                    i > 0 && chunks.push({string: charArr.slice(startIndex, i).join(''), startIndex, endIndex: Math.max(0, i - 1), isWord: true});
                    startIndex = i;
                } 
            }
            if (i === charArr.length - 1) {
                chunks.push({string: charArr.slice(startIndex, i + 1).join(''), startIndex, endIndex: Math.max(0, i - 1), isWord: processingWords});
            }
        }
        for (let i = 0; i < chunks.length;i++) {
            const chunk = chunks[i];
            const string = chunk.string;
            const startIndex  = chunk.startIndex;
            const endIndex = chunk.endIndex;
            if(this.cache.hasOwnProperty(string)) {
                tokensArr.push({
                    ...this.cache[string],
                    startIndex,
                    endIndex
                });
                continue;
            } 
            if (chunk.isWord) {
                let tokenObj;
                if (this.wordTokens.hasOwnProperty(string)) {
                    tokenObj = {...this.wordTokens[string], startIndex, endIndex};
                    tokensArr.push(tokenObj);
                } else {
                    tokenObj = {type: "variable", symbol: string, direction: null, precedence: 16, startIndex, endIndex};
                    tokensArr.push(tokenObj);
                }
                this.cache[string] = tokenObj;
            } else {
                const availableIndexes = new Set(Array.from({ length: string.length }, (_, index) => index + startIndex));
                let wordIndexStart = 0;
                let wordIndexEnd = wordIndexStart;
                let x = 0;
                while (availableIndexes.size > 0) {
                    const char = charArr[x + startIndex];
                    if (tokens.hasOwnProperty(char)) {
                        // if the previous charactrers formed a word
                        if (wordIndexEnd > wordIndexStart) {
                            wordIndexStart++;
                            const word = util.combineString(charArr, wordIndexStart, wordIndexEnd + 1);
                            if (this.wordTokens.hasOwnProperty(word)) {
                                tokensArr.push({...wordTokens[word], startIndex: wordIndexStart, endIndex: wordIndexEnd});
                            } else {
                                const isNum = !isNaN(Number(word));
                                tokensArr.push({type: isNum ? "number" : "variable", symbol: word, direction: null, precedence: 16, startIndex: wordIndexStart, endIndex: wordIndexStart});
                            }
                            wordIndexStart = wordIndexEnd;
                        }
                        const possibleTokens = tokens[char];
                        for (let j = 0;j < possibleTokens.length; j++) {
                            const tokenObj = possibleTokens[j];
                            const symbol = tokenObj.symbol;
                            const symbolLength = symbol.length;
                            const type = tokenObj.type;
                            const direction = tokenObj.direction;
                            const precedence = tokenObj.precedence;

                            const difference = symbol.length - char.length;
                            if (difference) {
                                let sameLengthString = util.combineString(charArr, x + startIndex, x + startIndex + symbolLength);
                                if (symbol === sameLengthString) {
                                    tokensArr.push({symbol, type, direction, precedence, startIndex: x + startIndex, endIdex: x + startIndex + symbolLength})
                                    for (let k = x;k < x + symbol.length; k++) {
                                        availableIndexes.delete(k + startIndex);
                                    }
                                    x += symbolLength;
                                    wordIndexStart = x + symbolLength + 1;
                                    break;
                                }
                            } else {
                                const sameLengthSymbols = possibleTokens.filter(entry => entry.symbol.length === 1);
                                tokensArr.push({symbols: sameLengthSymbols, symbol, startIndex: x + startIndex, endIdex: x + startIndex + symbol.length});
                                x += symbolLength;
                                wordIndexStart = x + symbolLength + 1;
                                break;
                            }
                        }
                        if(!availableIndexes.has(x + startIndex)) {
                            x = Array.from(availableIndexes).find(index => index > x + startIndex);
                            if (!x) break;
                            x -= startIndex;
                        }
                    } else {
                        availableIndexes.delete(x + startIndex);
                        wordIndexStart++;
                        wordIndexEnd = x + startIndex;
                        if (availableIndexes.size > 0) {
                            x = Array.from(availableIndexes)[0] - startIndex;
                        } else {
                            if(wordIndexEnd > wordIndexStart) {
                                const word = util.combineString(charArr, wordIndexStart, wordIndexEnd + 1);
                                const isNum = !isNaN(Number(word));
                                tokensArr.push({type: isNum ? "number" : "variable", symbol: word, direction: null, precedence: 16, startIndex: wordIndexStart, endIndex: wordIndexEnd});
                            }
                            break;
                        }
                    }
                }
  
            }
        }
       this.cache[inputString] = tokensArr;
        return tokensArr
    }
}
