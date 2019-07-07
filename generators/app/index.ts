import Generator from 'yeoman-generator';
import {
   prompt,
   TobaGenerator,
   copyFiles,
   setContext,
   installDependencies
} from '../toba-generator';

class AppGenerator extends Generator implements TobaGenerator {
   context = {};
   files = ['src/index.ts', 'jest.config.js'];

   constructor(args: string | string[], options: any) {
      super(args, options);
      setContext(this);
   }

   async prompting() {
      await prompt(this);
   }
   writing() {
      copyFiles(this);
   }
   install() {
      installDependencies(this);
   }
}

export = AppGenerator;
