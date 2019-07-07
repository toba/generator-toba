"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const toba_generator_1 = require("../toba-generator");
class AppGenerator extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        this.context = {};
        this.files = ['src/index.ts', 'jest.config.js'];
        toba_generator_1.setContext(this);
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            yield toba_generator_1.prompt(this);
        });
    }
    writing() {
        toba_generator_1.copyFiles(this);
    }
    install() {
        toba_generator_1.installDependencies(this);
    }
}
module.exports = AppGenerator;
