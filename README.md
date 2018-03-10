[![npm package](https://img.shields.io/npm/v/generator-toba.svg)](https://www.npmjs.org/package/generator-toba)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Dependencies](https://img.shields.io/david/toba/generator-toba.svg)](https://david-dm.org/toba/generator-toba)
[![DevDependencies](https://img.shields.io/david/dev/toba/generator-toba.svg)](https://david-dm.org/toba/generator-toba#info=devDependencies&view=list)

Yeoman generator for Toba TypeScript modules with standard linting, `tsconfig`, testing, licensing and packaging.

The `package.json` template file must be published with a different name or it affects which files in that folder npm recognizes.

## Usage

### Install Yeoman and the Toba Generator

Yarn

```bash
yarn global add yo
yarn global add generator-toba
```

or npm

```bash
npm install -g yo
npm install -g generator-toba
```

### Or just upgrade to the latest versions

```bash
yarn global upgrade
```

### Then run the generator inside a new module folder

```bash
yo toba
```

## Development

From within the repository

```bash
 npm link
```
