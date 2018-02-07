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
            name: this.appname.trim().replace(/\s+/g, '-')
        };
    }
    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What would you like to name the Toba module?',
                default: this.appname.trim().replace(/\s+/g, '-'),
                validate: (_name) => true
            }
        ];
        return this.prompt(prompts).then(answer => {
            this.props.name = answer['name'];
        });
    }
    writing() {
        ['_gitignore', '_travis.yml'].forEach(filename => {
            const fn = filename.replace('_', '.');
            this.fs.copyTpl(this.templatePath(filename), this.destinationPath(fn), this.props);
        });
        ['__package.json'].forEach(filename => {
            const fn = filename.replace('__', '');
            this.fs.copyTpl(this.templatePath(filename), this.destinationPath(fn), this.props);
        })
        [
            'index.ts',
            'LICENSE',
            'jest.config.js',
            'README.md',
            'tsconfig.json',
            'tslint.json'
        ].forEach(filename => {
            this.fs.copyTpl(this.templatePath(filename), this.destinationPath(filename), this.props);
        });
    }
    install() {
        this.yarnInstall();
    }
}
exports.TobaGenerator = TobaGenerator;
