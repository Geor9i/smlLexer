import { symbols } from "./constants.js";
import JSExpressionModule from "./lexerModules/jsExpressionModule/jsExpressionModule.js";

export default class SmlLexer {
    constructor(module) {
        this.modules = {
            jsExpressionModule: new JSExpressionModule()
        }
        if (!this.modules[module]) throw new Error(`${module} does not exist!`);

        this.module = this.modules[module];
    }

    ast(string) {
        console.log(string);
        const tokens = this.tokenise(string);
    }

    tokenise(string) {
        const initialFilterArr = this.removeEmptySpace(string);
        const firstPassTokens = [];
        initialFilterArr.forEach(str => {
            const isNum = !isNaN(Number(str));
            if (isNum && this.module.acceptsNumbers) {
                firstPassTokens.push(Number(str));
            } else {
                const tokens = this.module.getToken(str);
                firstPassTokens.push({ str, tokens });
                console.log(tokens);
            }
        })
        console.log(firstPassTokens);
    }

    removeEmptySpace(string) {
        const initialFilter = [];
        let buffer = '';
        for (let char of string) {
            if(['\n', '\t', '\r', '\v', '\f', ' '].includes(char)) {
                buffer.length ? initialFilter.push(buffer) : null;
                buffer = '';
            } else {
                if (!this.module.symbols.has(char)) {
                    const charCode = char.charCodeAt(0);
                    const isNum = charCode >= 48 && charCode <= 57;
                    const isLetter = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
                    if ((!isNum && this.module.acceptsNumbers) && (!isLetter && this.module.acceptsLetters)) {
                        throw new Error(`"${char}" is not supported by JSExpressionModule`)
                    }
                }
                buffer += char
            }
        }
        if (buffer.length) {
            initialFilter.push(buffer);
        }
        return initialFilter;
    }


}