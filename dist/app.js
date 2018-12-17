"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");
const defaultScope = 'toba';
class TobaGenerator extends Generator {
    constructor(args, options) {
        super(args, options);
        /**
         * Template properties to be injected with EJS.
         * @see http://ejs.co/
         */
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
                //validate: (_name: string) => true
            }
        ];
        return this.prompt(prompts).then(answer => {
            this.props.name = answer['name'];
            this.props.scope = answer['scope'];
        });
    }
    writing() {
        this.copy('-.vscode/-launch.json', '-.vscode/-settings.json', '-.vscode/-tasks.json', '-lib/-index.ts', '-.gitignore', '-.travis.yml', '-jest.config.js', '-LICENSE', '-package.json', '-README.md', '-tsconfig.json', '-tslint.json');
        mkdirp.sync(this.destinationPath('lib'));
    }
    install() {
        this.yarnInstall();
    }
    defaultName() {
        // cannot be getter since that causes `this` to be wrong
        return this.appname.trim().replace(/\s+/g, '-');
    }
    /**
     * Copy template files with optional file rename.
     *
     * @see http://yeoman.io/authoring/file-system.html
     */
    copy(...files) {
        files.forEach(source => {
            const target = source.replace(/(\/|^)(\-)/g, '$1');
            this.fs.copyTpl(this.templatePath(source), this.destinationPath(target), this.props);
        });
    }
}
exports.TobaGenerator = TobaGenerator;
