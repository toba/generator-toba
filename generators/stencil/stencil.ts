import { TobaGenerator } from '../';

export class StencilAppGenerator extends TobaGenerator {
   constructor(args: string | string[], options: any) {
      super(args, options);

      this.files = [
         '.stylelintrc',
         'src/components',
         'src/global',
         'src/index.html',
         'stencil.config.ts',
         'toba.json'
      ];
   }
}
