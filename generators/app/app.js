"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class TobaGenerator extends Generator {
    constructor(args, options) {
        super(args, options);
        this.props = {
            name: ''
        };
        this.props = {
            name: this.defaultName()
        };
    }
    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What would you like to name the Toba module?',
                default: this.defaultName(),
                validate: (_name) => true
            }
        ];
        return this.prompt(prompts).then(answer => {
            this.props.name = answer['name'];
        });
    }
    writing() {
        this.copy('-.vscode/-launch.json', '-.vscode/-settings.json', '-.vscode/-tasks.json', '-.gitignore', '-.travis.yml', '-index.ts', '-jest.config.js', '-LICENSE', '-package.json', '-README.md', '-tsconfig.json', '-tslint.json');
    }
    install() {
    }
    defaultName() {
        return this.appname.trim().replace(/\s+/g, '-');
    }
    copy(...files) {
        files.forEach(source => {
            const target = source.replace(/(\/|^)(\-)/g, '$1');
            this.fs.copyTpl(this.templatePath(source), this.destinationPath(target), this.props);
        });
    }
}
exports.TobaGenerator = TobaGenerator;
