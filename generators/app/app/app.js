"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class AppGenerator extends __1.TobaGenerator {
    constructor(args, options) {
        super(args, options);
        this.files = ['src/index.ts', 'jest.config.js'];
    }
}
exports.AppGenerator = AppGenerator;
