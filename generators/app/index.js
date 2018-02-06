"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class TobaGenerator extends Generator {
    method1() {
        this.log('method 1 just ran');
    }
    method2() {
        this.log('method 2 just ran');
    }
}
exports.TobaGenerator = TobaGenerator;
