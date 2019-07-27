import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
   namespace: '<%= name %>',
   outputTargets: [
      { type: 'dist' },
      //{ type: 'docs' },
      {
         type: 'www',
         serviceWorker: null // disable service workers
      }
   ],
   plugins: [
      sass({
         injectGlobalPaths: [
            // paths are relative to project root
            './node_modules/@toba/style/dist/toba/sass/mixins.scss'
         ]
      })
   ],
   copy: [
      {
         src: '**/**/i18n/*.json',
         dest: 'assets/i18n',
         warn: true
      }
   ],
   globalStyle: 'node_modules/@toba/style/dist/toba/toba.css'
};
