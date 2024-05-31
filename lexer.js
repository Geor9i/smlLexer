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
        const tokens = this.module.tokenise(string);
        console.log(tokens);
    }

}