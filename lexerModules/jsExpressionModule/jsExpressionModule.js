import { util } from '../../util.js';
import { tokens, wordTokens } from './constants.js';
export default class JSExpressionModule {
    constructor() {
        this.tokens = tokens;
        this.wordTokens = wordTokens;
        this.cache = {};
        this.charArr = []; 
        this.tokensArr = [];
        // Optimise this.tokens
        for (let [tokenIndex, tokenGroup] of Object.entries(this.tokens)) {
            let maxLength = 0;
            let counter = 0;
            for (let token in tokenGroup) {
                maxLength = token.length > maxLength ? token.length : maxLength;
                counter++
            }
            this.tokens[tokenIndex] = {
                tokens: tokenGroup,
                maxTokenLength: maxLength,
                tokenAmount: counter,
            }
        }
    }

    tokenise(string) {
        const chunks = string.split(/\s+/).filter(str => str.length);
        const tokens = [];
        for (let symbol of chunks) {
            const isNum = symbol.length &&!isNaN(Number(symbol));
            if (isNum) {
                this.tokensArr.push({symbol, type: 'number'});
            } else {
                const tokens = this.processChunk(symbol);
                // this.tokensArr.push(...tokens);
            }
        }
           
        return this.tokensArr;
    }

    processChunk(inputString) {
        const chunks = inputString.split(/(\W+)/)
        .flatMap(str => str.match(/(\W)\1*/g) ?? str)
        .filter(str => str.length)
        .map(chunk => {
            const isWord = /[a-zA-Z0-9]+/.test(chunk);
            if (isWord) {
                const token = this.processWords(chunk);
                this.cache[chunk] = token;
                return token;
            } 
            return chunk
        })
        const tokens = this.processRawSymbols(chunks)
        return tokens
    }

    processRawSymbols(chunks) {
        console.log(chunks);
        const cacheMakeToken = (tokenMatch, symbol) => {
            const token = {...tokenMatch, symbol}
            this.cache[symbol] = {...token};
            return token;
        }
        for (let i = 0;i < chunks.length; i++) {
            const chunk = chunks[i];
            if(typeof chunk !== 'string') continue;

            const char = chunk[0];
            const tokenGroup = this.tokens[char];
            if (tokenGroup) {
                const { tokens, maxTokenLength, tokenAmount } = tokenGroup;
                let tokenMatch = tokens[chunk];
                if (maxTokenLength === chunk.length && tokenMatch) {
                    const token = cacheMakeToken(tokenMatch, chunk)
                    chunks[i] = token;
                } else {
                    let missingSymbolLength = maxTokenLength - chunk.length;
                    // Get reamining potential symbol
                    const charArr = [...chunk];
                    const mergedChunkData = [];
                    for (let j = i;j < chunks.length; j++) {
                        if (missingSymbolLength <= 0 || (j === chunks.length - 1)) break;
                        
                        const nextChunk = chunks[j + 1];
                        if (typeof nextChunk !== 'string') continue;
                        charArr.push(...nextChunk);
                        mergedChunkData.push({index: j + 1, str: nextChunk});
                        missingSymbolLength -= nextChunk.length;
                    }
                    const potentialToken = charArr.join('');
                    tokenMatch = tokens[potentialToken];
                    if (tokenMatch) {
                        const token = cacheMakeToken(tokenMatch, chunk);
                        chunks[i] = token;
                        mergedChunkData.forEach(obj => chunks[obj.index] = null);
                    } else {
                        let selectedTokenKey = '';
                        for (let tokenKey in tokens) {
                            selectedTokenKey = tokenKey.length > selectedTokenKey && potentialToken.includes(tokenKey) ? tokenKey : selectedTokenKey;
                        }
                        let selectedToken = tokens[selectedTokenKey];
                        // if the found key is the same length as the original chunk
                        if (selectedTokenKey.length === chunk.length) {
                            const token = cacheMakeToken(selectedToken, chunk);
                            chunks[i] = token;
                        // if the found key overlaps with another chunk
                        } else {
                            let lengthRemainder = selectedTokenKey.length - chunk.length;
                            const remainingChunk = potentialToken.replace(selectedTokenKey, '');
                            console.log({remainingChunk, lengthRemainder, selectedTokenKey, chunk});
                            const token = cacheMakeToken(tokens[selectedTokenKey], selectedTokenKey);
                            chunks[i] = token;
                            for (let k = 0;k < mergedChunkData.length; k++) {
                                const obj = mergedChunkData[k];
                                const remainder = obj.str.length - lengthRemainder;
                                if (remainder > 0) {
                                    chunks[obj.index] = obj.str.slice(obj.str.length - remainder);
                                    mergedChunkData[k] = null;
                                    break;
                                } else {
                                    lengthRemainder = Math.abs(remainder);
                                }
                            }
                            mergedChunkData.forEach(obj => {
                                if (obj) {
                                    chunks[obj.index] = null;
                                }
                            });
                        } 
                    }
                }
            } else {
                throw new Error(`${chunk} is not a known token!`)
            }
            }
            console.log(chunks);
        }

    processWords(string) {
        let tokenObj;
        if (this.wordTokens.hasOwnProperty(string)) {
            tokenObj = { ...this.wordTokens[string], symbol: string };
        } else {
            tokenObj = { type: "variable", symbol: string, direction: null, precedence: 16 };
        }
        return tokenObj;
    }
}
