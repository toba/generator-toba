var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Generator from 'yeoman-generator';
const defaultScope = 'toba';
var PromptType;
(function (PromptType) {
    PromptType["Input"] = "input";
    PromptType["Confirm"] = "confirm";
    PromptType["List"] = "list";
    PromptType["RawList"] = "rawlist";
    PromptType["Password"] = "password";
})(PromptType || (PromptType = {}));
export class TobaGenerator extends Generator {
    constructor(args, options) {
        super(args, options);
        this.props = {
            name: '',
            scope: defaultScope,
            example: false
        };
        this.props = {
            name: this.defaultName(),
            scope: defaultScope,
            example: false
        };
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const prompts = [
                {
                    type: PromptType.List,
                    name: 'scope',
                    message: 'What is the npm organization name?',
                    choices: [
                        { name: 'Toba', value: 'toba' },
                        { name: 'Trail Image', value: 'trailimage' }
                    ],
                    default: defaultScope
                },
                {
                    type: PromptType.Input,
                    name: 'name',
                    message: `What would you like to name the ${this.props.scope} module?`,
                    default: this.defaultName()
                },
                {
                    type: PromptType.Confirm,
                    name: 'example',
                    message: 'Include React Example App?',
                    default: false
                }
            ];
            const answer = yield this.prompt(prompts);
            this.props.name = answer['name'];
            this.props.scope = answer['scope'];
            this.props.example = answer['example'];
        });
    }
    writing() {
        const files = [
            '-.vscode/-launch.json',
            '-.vscode/-settings.json',
            '-.vscode/-tasks.json',
            '-src/-index.ts',
            '-.gitignore',
            '-.travis.yml',
            '-jest.config.js',
            '-LICENSE',
            '-package.json',
            '-prettier.config.js',
            '-README.md',
            '-tsconfig.json',
            '-tsconfig.build.json',
            '-tslint.json'
        ];
        if (this.props.example) {
            files.push('-examples/-webpack.config.ts', '-examples/-src/-app.tsx');
        }
        files.forEach(source => {
            const target = source.replace(/(\/|^)(\-)/g, '$1');
            this.fs.copyTpl(this.templatePath(source), this.destinationPath(target), this.props);
        });
    }
    install() {
        this.yarnInstall();
    }
    defaultName() {
        return this.appname.trim().replace(/\s+/g, '-');
    }
}
