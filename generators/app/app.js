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
            name: this._defaultName
        };
    }
    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What would you like to name the Toba module?',
                default: this._defaultName,
                validate: (_name) => true
            }
        ];
        return this.prompt(prompts).then(answer => {
            this.props.name = answer['name'];
        });
    }
    writing() {
        this._copy(['_gitignore', '_travis.yml'], n => n.replace('_', '.'));
        this._copy(['__package.json'], n => n.replace('__', ''));
        this._copy([
            'index.ts',
            'jest.config.js',
            'LICENSE',
            'README.md',
            'tsconfig.json',
            'tslint.json'
        ]);
    }
    install() {
        this.yarnInstall();
    }
    get _defaultName() {
        return this.appname.trim().replace(/\s+/g, '-');
    }
    _copy(files, rename = n => n) {
        files.forEach(f => {
            f = rename(f);
            this.fs.copyTpl(this.templatePath(f), this.destinationPath(f), this.props);
        });
    }
}
exports.TobaGenerator = TobaGenerator;
