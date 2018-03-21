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
         name: this.defaultName
      };
   }

   prompting() {
      const prompts = [
         {
            type: 'input',
            name: 'name',
            message: 'What would you like to name the Toba module?',
            default: this.defaultName,
            validate: (_name: string) => true
         }
      ];

      return this.prompt(prompts).then(answer => {
         this.props.name = answer['name'];
      });
   }

   writing() {
      this.copy([
         '-.gitignore',
         '-.travis.yml',
         '-index.ts',
         '-jest.config.js',
         '-LICENSE',
         '-package.json',
         '-README.md',
         '-tsconfig.json',
         '-tslint.json'
      ]);
   }

   install() {
      this.yarnInstall();
   }

   private get defaultName(): string {
      return this.appname.trim().replace(/\s+/g, '-');
   }

   /**
    * Copy template files with optional file rename.
    *
    * http://yeoman.io/authoring/file-system.html
    */
   private copy(files: string[]) {
      files.forEach(source => {
         const target = source.replace(/^\-/, '');
         this.fs.copyTpl(
            this.templatePath(source),
            this.destinationPath(target),
            this.props
         );
      });
   }
}
