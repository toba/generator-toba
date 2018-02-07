import * as Generator from 'yeoman-generator';

export class TobaGenerator extends Generator {
   /**
    * Template properties to be injected with EJS.
    * http://ejs.co/
    */
   props = {
      name: ''
   };

   constructor(args: string | string[], options: any) {
      super(args, options);

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
            validate: (_name: string) => true
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

   get _defaultName(): string {
      return this.appname.trim().replace(/\s+/g, '-')
   }

   /**
    * Copy template files with optional file rename.
    */
   _copy(files: string[], rename: (n: string) => string = n => n) {
      files.forEach(f => {
         f = rename(f);
         this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(f),
            this.props
         );
      })
   }
}
