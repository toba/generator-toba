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
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
var PromptType;
(function (PromptType) {
    PromptType["Input"] = "input";
    PromptType["Confirm"] = "confirm";
    PromptType["List"] = "list";
    PromptType["RawList"] = "rawlist";
    PromptType["Password"] = "password";
})(PromptType || (PromptType = {}));
const defaultScope = 'toba';
const commonFiles = [
    '.vscode/launch.json',
    '.vscode/settings.json',
    '.vscode/tasks.json',
    '.eslintrc',
    '.gitignore',
    '.travis.yml',
    'LICENSE',
    'package.json',
    'prettier.config.js',
    'README.md',
    'tsconfig.json',
    'tsconfig.build.json'
];
class TobaGenerator extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        this.props = {
            name: '',
            scope: defaultScope
        };
        this.files = [];
        this.props = {
            name: this.defaultName(),
            scope: defaultScope
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
                }
            ];
            const answer = yield this.prompt(prompts);
            this.props.name = answer['name'];
            this.props.scope = answer['scope'];
        });
    }
    writing() {
        const files = [...commonFiles, ...this.files].map(f => '-' + f.replace(/\/(\w)/g, '/-$1'));
        files.forEach(source => {
            const target = source.replace(/(\/|^)(\-)/g, '$1');
            this.fs.copyTpl(this.templatePath(source), this.destinationPath(target), this.props);
        });
    }
    install() {
        this.npmInstall();
    }
    defaultName() {
        return this.appname.trim().replace(/\s+/g, '-');
    }
}
exports.TobaGenerator = TobaGenerator;
