import * as Generator from 'yeoman-generator';

const defaultScope = 'toba';

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

export class TobaGenerator extends Generator {
   /**
    * Template properties to be injected with EJS.
    * @see http://ejs.co/
    */
   props = {
      name: '',
      scope: defaultScope,
      example: false
   };

   constructor(args: string | string[], options: any) {
      super(args, options);

      this.props = {
         name: this.defaultName(),
         scope: defaultScope,
         example: false
      };
   }

   async prompting() {
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
            message: `What would you like to name the ${
               this.props.scope
            } module?`,
            default: this.defaultName()
         },
         {
            type: PromptType.Confirm,
            name: 'example',
            message: 'Include React Example App?',
            default: false
         }
      ];

      const answer = await this.prompt(prompts);

      this.props.name = answer['name'];
      this.props.scope = answer['scope'];
      this.props.example = answer['example'];
   }

   /**
    * Copy template files with optional file rename.
    *
    * @see http://yeoman.io/authoring/file-system.html
    */
   writing() {
      const files = [
         '-.vscode/-launch.json',
         '-.vscode/-settings.json',
         '-.vscode/-tasks.json',
         '-src/-index.ts',
         '-.eslintrc',
         '-.gitignore',
         '-.travis.yml',
         '-jest.config.js',
         '-LICENSE',
         '-package.json',
         '-prettier.config.js',
         '-README.md',
         '-tsconfig.json',
         '-tsconfig.build.json'
      ];

      if (this.props.example) {
         files.push('-examples/-web/-app.tsx');
      }

      files.forEach(source => {
         const target = source.replace(/(\/|^)(\-)/g, '$1');
         this.fs.copyTpl(
            this.templatePath(source),
            this.destinationPath(target),
            this.props
         );
      });
   }

   install() {
      this.yarnInstall();
   }

   private defaultName(): string {
      // cannot be getter since that causes `this` to be wrong
      return this.appname.trim().replace(/\s+/g, '-');
   }
}
