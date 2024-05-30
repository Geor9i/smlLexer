import JSExpressionModule from "./lexerModules/jsExpressionModule/jsExpressionModule.js";
import { util } from "./util.js";

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
        const initialFilterArr = string.split(/\s+/);
        console.log(initialFilterArr);
        const firstPassTokens = [];
        initialFilterArr.forEach(symbol => {
            const isNum = symbol.length &&!isNaN(Number(symbol));
            if (isNum && this.module.acceptsNumbers) {
                firstPassTokens.push({symbol, type: 'number'});
            } else {
                const tokens = this.module.getTokens(symbol);
                firstPassTokens.push(...tokens);
            }
        })
        console.log(firstPassTokens);
    }
}