"use strict";
const __1 = require("../");
class AppGenerator extends __1.TobaGenerator {
    constructor(args, options) {
        super(args, options);
        this.files = ['src/index.ts', 'jest.config.js'];
    }
}
module.exports = AppGenerator;
