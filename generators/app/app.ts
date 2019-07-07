import { TobaGenerator } from '../';

export class AppGenerator extends TobaGenerator {
   constructor(args: string | string[], options: any) {
      super(args, options);
      this.files = ['src/index.ts', 'jest.config.js'];
   }
}
