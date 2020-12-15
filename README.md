# dapla-catalog-viewer
[![npm version](https://badge.fury.io/js/%40statisticsnorway%2Fdapla-catalog-viewer.svg)](https://badge.fury.io/js/%40statisticsnorway%2Fdapla-catalog-viewer)
[![Build Status](https://dev.azure.com/statisticsnorway/Dapla/_apis/build/status/statisticsnorway.dapla-catalog-viewer?branchName=master)](https://dev.azure.com/statisticsnorway/Dapla/_build/latest?definitionId=74&branchName=master)

This application is built for in-house use in Statistics Norway and it aims to create an interactive view of the
catalogs exposed by [dapla-catalog](https://github.com/statisticsnorway/dapla-catalog).

Functionality includes:
* Listing catalogs (paths) and the ability to filter/search through
* Viewing pseudonymization configuration for a given path

The project makes limited use of the [ssb-component-library](https://github.com/statisticsnorway/ssb-component-library)
and is based upon [react-reference-app](https://github.com/statisticsnorway/react-reference-app).

### Use as a library
If you want to use this application as a library in your project, simply add it with yarn.

`yarn add @statisticsnorway/dapla-catalog-viewer`

The component requires a few peer dependencies to work, namely:

* @statisticsnorway/dapla-js-utilities
* axios-hooks
* React
* SemanticUI

In your application import the component.

`import { CatalogViewer } from '@statisticsnorway/dapla-catalog-viewer'`

The component needs two properties to function correctly, `restApi` and `language`.

`<CatalogViewer restApi='http://localhost:8080' language='en' />`

`restApi` is the base url for any dapla-catalog service you wish to use and `language` sets the language of the component.
`en` (English) and `nb` (Norwegian) is available.

### Try this application locally
The first time you clone the repository, remember to run `yarn` or `yarn install`.

Run `yarn start` and navigate to `http://localhost:3000/`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

#### Docker locally
* `yarn build`
* `docker build -t dapla-catalog-viewer .`
* `docker run -p 8000:80 dapla-catalog-viewer:latest`
  * Alternatively with custom environment variables: `docker run -p 8000:80 -e REACT_APP_API=http://localhost:20111 dapla-catalog-viewer:latest`
* Navigate to `http://localhost:8000`

**Note** that this application requires [dapla-project (localstack)](https://github.com/statisticsnorway/dapla-project/blob/master/localstack/README.md)
running to function locally.

### Publish library
To publish to [npm](https://www.npmjs.com) you need a user and a membership in the `statisticsnorway` organization on 
npm. The user must also have 2FA authentication enabled. Steps to follow:

1. Login into your npm account in a terminal with `npm login`
2. Make sure all tests works (test components in the example application aswell, if you made a new one)
3. Bump version in `package.json`
4. Run `yarn package`
5. Dry run a release with `npm pack`
6. Publish with `npm publish --access public --otp=<code>` (`<code>` is your 2FA code, without `<>`)
