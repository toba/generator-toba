import Generator from 'yeoman-generator';
import {
   prompt,
   TobaGenerator,
   copyFiles,
   setContext,
   installDependencies
} from '../toba-generator';

class StencilGenerator extends Generator implements TobaGenerator {
   context = {};
   files = [
      '.stylelintrc',
      // 'src/components',
      // 'src/global',
      'src/index.html',
      'stencil.config.ts',
      'toba.json'
   ];

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

export = StencilGenerator;
