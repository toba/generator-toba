"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class StencilAppGenerator extends __1.TobaGenerator {
    constructor(args, options) {
        super(args, options);
        this.files = [
            '.stylelintrc',
            'src/components',
            'src/global',
            'src/index.html',
            'stencil.config.ts',
            'toba.json'
        ];
    }
}
exports.StencilAppGenerator = StencilAppGenerator;
