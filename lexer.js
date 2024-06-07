import JSParserModule from "./lexerModules/JSParserModule/JSParserModule.js";

export default class SmlLexer {
    constructor(module) {
        this.modules = {
            jsExpressionModule: new JSParserModule()
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