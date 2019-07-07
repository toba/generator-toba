import Generator from 'yeoman-generator';

/**
 * https://yeoman.io/authoring/user-interactions.html
 */
enum PromptType {
   /** @see https://github.com/SBoudrias/Inquirer.js/#input---type-input */
   Input = 'input',
   /** @see https://github.com/SBoudrias/Inquirer.js/#confirm---type-confirm */
   Confirm = 'confirm',
   /** @see https://github.com/SBoudrias/Inquirer.js/#list---type-list */
   List = 'list',
   /** @see https://github.com/SBoudrias/Inquirer.js/#raw-list---type-rawlist */
   RawList = 'rawlist',
   /** @see https://github.com/SBoudrias/Inquirer.js/#password---type-password */
   Password = 'password'
}

/**
 * Default npm package scope.
 */
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

export interface TobaGenerator extends Generator {
   /**
    * Unique files (other than `commonFiles`) that will be copied from the
    * template to the new project.
    */
   files: string[];
   /**
    * Template properties to be injected with EJS.
    * @see http://ejs.co/
    */
   context: {
      name?: string;
      scope?: string;
   };
}

/**
 * Default project name.
 */
const projectName = (g: Generator): string =>
   g.appname.trim().replace(/\s+/g, '-');

export function setContext(g: TobaGenerator) {
   g.context = {
      name: projectName(g),
      scope: defaultScope
   };
}

export async function prompt(g: TobaGenerator) {
   const prompts: Generator.Question[] = [
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
         message: `What would you like to name the ${g.context.scope} module?`,
         default: projectName(g)
      }
   ];

   const answer = await g.prompt(prompts);

   g.context.name = answer['name'];
   g.context.scope = answer['scope'];
}

/**
 * Copy template files with optional file rename.
 *
 * @see http://yeoman.io/authoring/file-system.html
 */
export function copyFiles(g: TobaGenerator) {
   /**
    * Source files with hyphens added before names
    */
   const files = [...commonFiles, ...g.files].map(
      f => '-' + f.replace(/\/(\w)/g, '/-$1')
   );

   files.forEach(source => {
      const target = source.replace(/(\/|^)(\-)/g, '$1');
      g.fs.copyTpl(
         g.templatePath(source),
         g.destinationPath(target),
         g.context
      );
   });
}

export function installDependencies(g: Generator) {
   g.npmInstall();
}
