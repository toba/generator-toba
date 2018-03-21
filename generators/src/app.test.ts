import * as helpers from 'yeoman-test';
//import path from 'path';
//import * as yeoman from 'yeoman-environment';
//import * as assert from 'yeoman-assert';
//import * as path from 'path';

//const env = yeoman.createEnv();

const deps = [__dirname];

// http://yeoman.io/authoring/testing.html
// http://yeoman.io/contributing/testing-guidelines.html
// https://github.com/yeoman/yo/issues/300
test('generates files', () => {
   // helpers.registerDependencies(env, [[this.StubGenerator, 'stub:app']]);
   const example = helpers.createGenerator('toba:src', deps, null, {
      skipInstall: true,
      skipLog: true
   });

   example.run(err => {
      expect(err).toBeNull();
   });
   // return (
   //    helpers
   //       .run(__dirname)
   //       // .withOptions({ foo: 'bar' })
   //       //.withArguments(['name-x'])
   //       .withPrompts({ name: 'test-name', appName: 'test' })
   //       .then(() => {
   //          //expect(this).toBeDefined();
   //          expect(2).toBe(2);
   //       })
   // );
});
