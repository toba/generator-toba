import * as Generator from 'yeoman-generator';
import * as mkdirp from 'mkdirp';

const defaultScope = 'toba';

export class TobaGenerator extends Generator {
   /**
    * Template properties to be injected with EJS.
    * @see http://ejs.co/
    */
   props = {
      name: '',
      scope: defaultScope
   };

   constructor(args: string | string[], options: any) {
      super(args, options);

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
            message: `What would you like to name the ${
               this.props.scope
            } module?`,
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
      this.copy(
         '-.vscode/-launch.json',
         '-.vscode/-settings.json',
         '-.vscode/-tasks.json',
         '-lib/-index.ts',
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
      );
      mkdirp.sync(this.destinationPath('lib'));
   }

   install() {
      this.yarnInstall();
   }

   private defaultName(): string {
      // cannot be getter since that causes `this` to be wrong
      return this.appname.trim().replace(/\s+/g, '-');
   }

   /**
    * Copy template files with optional file rename.
    *
    * @see http://yeoman.io/authoring/file-system.html
    */
   private copy(...files: string[]) {
      files.forEach(source => {
         const target = source.replace(/(\/|^)(\-)/g, '$1');
         this.fs.copyTpl(
            this.templatePath(source),
            this.destinationPath(target),
            this.props
         );
      });
   }
}
