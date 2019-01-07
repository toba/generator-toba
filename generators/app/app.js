"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");
const defaultScope = 'toba';
class TobaGenerator extends Generator {
    constructor(args, options) {
        super(args, options);
        this.props = {
            name: '',
            scope: defaultScope
        };
        this.props = {
            name: this.defaultName(),
            scope: defaultScope
        };
    }
    prompting() {
        const prompts = [
            {
                type: 'list',
                name: 'scope',
                message: 'What is the npm organization name?',
                choices: [
                    { name: 'Toba', value: 'toba' },
                    { name: 'Trail Image', value: 'trailimage' }
                ],
                default: defaultScope
            },
            {
                type: 'input',
                name: 'name',
                message: `What would you like to name the ${this.props.scope} module?`,
                default: this.defaultName()
            }
        ];
        return this.prompt(prompts).then(answer => {
            this.props.name = answer['name'];
            this.props.scope = answer['scope'];
        });
    }
    writing() {
        this.copy('-.vscode/-launch.json', '-.vscode/-settings.json', '-.vscode/-tasks.json', '-src/-index.ts', '-.gitignore', '-.travis.yml', '-jest.config.js', '-LICENSE', '-package.json', '-prettier.config.js', '-README.md', '-tsconfig.json', '-tsconfig.build.json', '-tslint.json');
        mkdirp.sync(this.destinationPath('lib'));
    }
    install() {
        this.yarnInstall();
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
