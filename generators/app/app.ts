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
         name: this.appname.trim().replace(/\s+/g, '-')
      };
   }

   prompting() {
      const prompts = [
         {
            type: 'input',
            name: 'name',
            message: 'What would you like to name the Toba module?',
            default: this.appname.trim().replace(/\s+/g, '-'),
            validate: (_name: string) => true
         }
      ];

      return this.prompt(prompts).then(answer => {
         this.props.name = answer['name'];
      });
   }

   writing() {
      ['_gitignore', '_travis.yml'].forEach(filename => {
         const fn = filename.replace('_', '.');
         this.fs.copyTpl(
            this.templatePath(filename),
            this.destinationPath(fn),
            this.props
         );
      });

      [
         'index.ts',
         'jest.config.js',
         'LICENSE',
         'package.json',
         'README.md',
         'tsconfig.json',
         'tslint.json'
      ].forEach(filename => {
         this.fs.copyTpl(
            this.templatePath(filename),
            this.destinationPath(filename),
            this.props
         );
      });
   }

   install() {
      this.yarnInstall();
   }
}
