import * as helpers from 'yeoman-test';
//import * as assert from 'yeoman-assert';
import * as path from 'path';

// http://yeoman.io/authoring/testing.html
// http://yeoman.io/contributing/testing-guidelines.html

test('generates files', () =>
   helpers
      .run(path.join(__dirname, '..', 'app'))
      // .withOptions({ foo: 'bar' })
      //.withArguments(['name-x'])
      .withPrompts({ name: 'test-name', appName: 'test' })
      .then(() => {
         //expect(this).toBeDefined();
         expect(2).toBe(2);
      }));
