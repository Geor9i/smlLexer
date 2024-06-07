import { symbolTokens, wordTokens } from './constants.js';
import { grammar } from './grammar.js';
export default class JSExpressionModule {
    constructor() {
        this.symbolTokens = symbolTokens;
        this.wordTokens = wordTokens;
        this.cursor = 0;
        this.cache = {};
        this.tokens = [];
        this.currentContext = null;
        this.group = {
            parenthesisOpen: 0,
            parenthesisClose: 0,
            squareBracketsOpen: 0,
            squareBracketsClose: 0,
            curlyBracketsOpen: 0,
            curlyBracketsClose: 0,
        },
        this.context = null;
    }

    tokenise(string) {
        let chunkObjects = this.processStrings(string);
        for (let chunkObject of chunkObjects) {
            if (chunkObject.type === 'string') {
                this.buildContext(chunkObject);
                continue;
            }
            const whitespacePattern = /(\s+)/;
            let chunks = chunkObject.symbol.split(whitespacePattern).filter(str => str.length);
            for (let chunk of chunks) {
                if (chunk.match(whitespacePattern) !== null) {
                    this.indexString(chunk);
                    continue;
                }
                const isNum = chunk.length &&!isNaN(Number(chunk));
                if (isNum) {
                    const [startIndex, endIndex] = this.indexString(chunk);
                    const token = { symbol: chunk, type: 'number', startIndex, endIndex };
                    this.buildContext(token);
                } else {
                    const tokens = this.processChunk(chunk);
                    this.buildContext(...tokens);
                }
            }
        }
        return this.tokens;
    }

    buildContext(...tokens) {
        for(let token of tokens) {
            // console.log(token);
            this.tokens.push(token);
        }
    }

    processStrings(inputString) {
        const stringPattern =  /("[^"]*")|('[^']*')/g;
        const separatedStrings = [];
        const rawChunks = inputString.split(stringPattern);
        for (let chunk of rawChunks) {
            if (!chunk) continue;
                const isString = stringPattern.test(chunk);
                if (isString) {
                    const [startIndex, endIndex] = this.indexString(chunk);
                    separatedStrings.push({type: 'string', symbol: chunk, startIndex, endIndex })
                }else {
                    separatedStrings.push({type: 'chunk', symbol: chunk })
                }
                    
        }
        return separatedStrings;
    }

    groupContext() {
        // TODO Must be able to gather all groups together 
        const allTokens = [...this.tokens];
        const groupTokenIndexes = []
        // Gather all group tokens
        const openTokenTypes = ['parenthesisOpen', 'squareBracketsOpen', 'curlyBracketsOpen',];
        const closedTokenTypes = ['parenthesisClose', 'squareBracketsClose', 'curlyBracketsClose'];
        const pairs = {
            parenthesis: [],
            squareBrackets: [],
            curlyBrackets: [],
        }
        for (let i = 0;i < allTokens.length; i++) {
            const token = allTokens[i];
            if (openTokenTypes.includes(token.type) ) {
                groupTokenIndexes.push({type: token.type, index: i})
            }else if (closedTokenTypes.includes(token.type) ) {
                groupTokenIndexes.push({type: token.type, index: i})
            }
        }
        const getGroupType = (type) => {
            const groupType = type.toLowerCase().includes('open') ? 'open' : 'close';
            const typeName = type.replace(new RegExp(`${groupType}`, 'i'), '');
        }
        for (let i = 0; i < groupTokenIndexes.length; i++) {
            const { type, index } = groupTokenIndexes[i];
            let openTypeCounter = 0;
            for(let j = i + 1; j < groupTokenIndexes.length; j++) {
                const { type: secondType, index: secondIndex } = groupTokenIndexes[j];
                
                console.log({type, secondType});
            }
        }
        console.log(groupTokenIndexes);
           
        // const group = () => {
        //    while(itteratorIndex < groupTokenIndexes.length){
        //         const groupTokenIndex = groupTokenIndexes[itteratorIndex];
        //         const groupToken = allTokens[groupTokenIndex];
        //         const type = groupToken.type;
        //         let openTokenIndex;
        //         if(type.toLowerCase().includes('open')) {
        //             symbolCount[type]++;
        //             pairs[type]
        //         } else {

        //         }
        //         // if(groupToken.symbol === '(') {
        //         //     groupSymbolCount++;
        //         //     prevGroupToken = allTokens[groupTokenIndex - 1];
        //         //     if (prevGroupToken && prevGroupToken.type === 'variable') {
        //         //         isFunctionCall = true;
        //         //     }
        //         //     openGroupIndex = groupTokenIndexes[itteratorIndex];
        //         // } else if (groupToken.symbol === ')') {
        //         //     if (groupSymbolCount <= 0) {
        //         //         throw new Error(`Token ")" has no beggining!`)
        //         //     } else if (groupSymbolCount === 1) {
        //         //         pairs.push({startIndex: openGroupIndex, endIndex: groupTokenIndexes[itteratorIndex] + 1, isFunctionCall});
        //         //         openGroupIndex = null;
        //         //         groupSymbolCount = 0;
        //         //         isFunctionCall = false;
        //         //     }else {
        //         //         itteratorIndex++;
        //         //         group();
        //         //     }
        //         // }
        //         itteratorIndex++
        //    }
        // }
        // group();
        const resultTokens = [];
        let prevCutIndex = 0;
        // rebuild tokens
        // for (let group of pairs) {
        //     const { startIndex, endIndex, isFunctionCall } = group;
        //     const previousTokens = allTokens.slice(prevCutIndex, startIndex - (isFunctionCall ? 1 : 0))
        //     const groupedTokens = allTokens.slice(startIndex - (isFunctionCall ? 1 : 0), endIndex)
        //     resultTokens.push(...previousTokens, groupedTokens)
        //     prevCutIndex = endIndex
        // }
        // resultTokens.push(...allTokens.slice(prevCutIndex))
        // this.tokensArr = resultTokens;
    }

    processChunk(inputString) {
        const cacheMakeToken = (tokenMatch, symbol) => {
            let token;
            const [startIndex, endIndex] = this.indexString(symbol)
            if (Array.isArray(tokenMatch)) {
                token = {clashes: [...tokenMatch], symbol, startIndex, endIndex};
            } else {
                token = {...tokenMatch, symbol, startIndex, endIndex}
                this.cache[symbol] = {...token};
            }
            return token;
        }
        const getChunk = (chunkIndex) => {
            if (chunks.length > chunkIndex && typeof chunks[chunkIndex] === 'string') {
                return chunks[chunkIndex];
            }
            return null;
        }

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
            return chunk;
        })
       
        const resultTokens = [];
        let chunkIndex = 0;
        let charIndex = 0;
        while(chunkIndex < chunks.length) {
            if (typeof chunks[chunkIndex] === 'object') {
                const [startIndex, endIndex] = this.indexString(chunks[chunkIndex].symbol);
                resultTokens.push({...chunks[chunkIndex], startIndex, endIndex});
                chunkIndex++;
                continue;
            }

            let chunkArr = [...chunks[chunkIndex]];
            while(chunkArr.length) {
                let char = chunkArr[charIndex];
                let tokenGroup = this.symbolTokens[char] ?? null;
                if (!tokenGroup) {
                    throw new Error(`"${char}" is not a recognised Token!`);
                }
                let tokens = Object.keys(tokenGroup).sort((a, b) => b.length - a.length);
                let tokenIndex = 0;
                let potentialToken = tokens[tokenIndex];
                let tokenLength = potentialToken.length;
                let nextChunkIndex = chunkIndex;
                while(potentialToken.length > chunkArr.length){
                    let secondLoopBreakFlag = false;
                    nextChunkIndex++;
                    let nextChunk = getChunk(nextChunkIndex);
                    if (!nextChunk) {
                        tokenIndex++;
                        potentialToken = tokens[tokenIndex];
                    } else {
                        chunkArr.push(...nextChunk);
                        chunks[nextChunkIndex] = null;
                        chunkIndex++;
                    }
                    let chunkArrTargetChars = chunkArr.slice(0, tokenLength);
                    while(chunkArrTargetChars.length) {
                        let str = chunkArrTargetChars.join('');
                        if (str === potentialToken) {
                            secondLoopBreakFlag = true;
                            break
                        }
                        tokenIndex++
                        potentialToken = tokens[tokenIndex];
                        tokenLength = potentialToken.length;
                        chunkArrTargetChars = chunkArr.slice(0, tokenLength);
                    }
                    if (secondLoopBreakFlag) break;
                }
                const token = cacheMakeToken(tokenGroup[potentialToken], potentialToken);
                // Group tokens
                if (token.hasOwnProperty('groupType')) {
                    const type = token.type;
                    this.group[type]++;
                }
                resultTokens.push(token);
                chunkArr = chunkArr.slice(tokenLength);
            }
            chunkIndex++;
        }
      return resultTokens;
        }

    processWords(string) {
        let tokenObj;
        if (this.wordTokens.hasOwnProperty(string)) {
            tokenObj = { ...this.wordTokens[string], symbol: string };
        } else {
            tokenObj = { type: isNaN(Number(string)) ? "word" : "number", symbol: string, direction: null, precedence: 16};
        }
        return tokenObj;
    }

    indexString(string) {
        const startIndex = this.cursor
        const endIndex = this.cursor + string.length - 1;
        this.cursor += string.length;
        return [startIndex, endIndex];
    }
}

