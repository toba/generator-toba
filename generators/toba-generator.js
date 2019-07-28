"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const projectName = (g) => g.appname.trim().replace(/\s+/g, '-');
function setContext(g) {
    g.context = {
        name: projectName(g),
        scope: defaultScope
    };
}
exports.setContext = setContext;
function prompt(g) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompts = [
            {
                type: "list",
                name: 'scope',
                message: 'What is the npm organization name?',
                choices: [
                    { name: 'Toba', value: 'toba' },
                    { name: 'Trail Image', value: 'trailimage' }
                ],
                default: defaultScope
            },
            {
                type: "input",
                name: 'name',
                message: `What would you like to name the ${g.context.scope} module?`,
                default: projectName(g)
            }
        ];
        const answer = yield g.prompt(prompts);
        g.context.name = answer['name'];
        g.context.scope = answer['scope'];
    });
}
exports.prompt = prompt;
function copyFiles(g) {
    const files = [...commonFiles, ...g.files].map(f => '-' + f.replace(/\/(\w)/g, '/-$1'));
    files.forEach(source => {
        const target = source.replace(/(\/|^)(\-)/g, '$1');
        g.fs.copyTpl(g.templatePath(source), g.destinationPath(target), g.context);
    });
}
exports.copyFiles = copyFiles;
function installDependencies(g) {
    g.npmInstall();
}
exports.installDependencies = installDependencies;
