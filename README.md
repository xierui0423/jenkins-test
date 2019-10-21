# IDC Web Front-end Boilerplates
**Before you dive into this repo, please go through our development handbooks to understand our coding principles and standards**
* [Development Handbook](https://loweproferotech.atlassian.net/wiki/spaces/BTS/pages/763461856/Development+Handbook)
* [Front-end Development Handbook](https://loweproferotech.atlassian.net/wiki/spaces/BTS/pages/791183452/FE+Development+Handbook)
  
## What is this repository for?
* This is repo is used to provide boilerplates/templates to initialize MLP IDC Web Front-end projects.

## How do I get set up?
* There are multiple branches in the repo, each of them represents a specific boilerplate, they are categoried by main JS frameworks and project scales/types, please look into each branch's root README for detail information.

## How do I contribute?
* Feel free to make pull requests for things you'd like to add/update. Just make sure the coding standards are followed.

## Who do I talk to?
* Please contact IDC [FE Tech Lead](mailto:ray.xie@mullenloweprofero.com) in case you have any questions or suggestions.

<br/>

# Branch Specific (basic)

This basic project template can be used with any typical CMS sites without complicated FE render logic.

Examples (similar but may not be exactly match to the structure of this boilerplate branch as they were built prior to this repo):

* Houlihan Lokey https://github.com/hlhzdev/hl.com-redesign-front-end/tree/develop
* KP FEDs Rebuild

## Project structure
dist - compiled code (uncompressed)
prod - compiled code (compressed)
src
├─ assets # static assets such as images and font files
├─ common # shared resources like global css, html mixins and util js
├─ components # reusable components
├─ entry # entry files of the js and css bundle, as well as the html template
└─ pages # static page templates with page specific data feeds

## Dependencies

### JS
* [jquery](https://jquery.com/)

* [babel](https://babeljs.io/) - The ES6+ compiler
    * @babel/core 
    * @babel/preset-env 
        * babel rulesets based on defined browser targets
    * babel-eslint 
        * eslint parser to lint code transformed by babel

### CSS
* [node-sass](https://sass-lang.com/)
    * CSS preprocessor
* [postcss-preset-env](https://preset-env.cssdb.org/)
    * just like babel for css, this allows to compile modern css for targeted browsers
* [normalize.css](https://necolas.github.io/normalize.css/)
    * reset css styles

### HTML
* [pug](https://pugjs.org/api/getting-started.html)
  * HTML preprocessor

### [webpack](https://webpack.js.org/) - The project bundler
* webpack
* webpack-cli
* webpack-dev-server
* webpack-merge
    * used to merge webpack configs so that we can create environments specific configs from the base/common config

* clean-webpack-plugin
    * wp plugin to clean build folder before each build
* copy-webpack-plugin 
    * wp plugin to copy things like static assets to the build folders
* extract-text-webpack-plugin
    * wp plugin to abstrct css to files
* html-webpack-plugin
  * w p plugin to create html from templat´and auto-connet with js and css bundles
* loaders for different file types, the details can be found in /webpack.common.js
    * css
        * css-loader
        * sass-loader
        * postcss-loader
    * js
        * babel-loader
    * html
        * pug-loader
    * static assets (fonts, images, etc.)
        * file-loader


### linters
* [husky](https://github.com/typicode/husky)
    * tool to config git hooks
* [@commitlint/cli](https://conventional-changelog.github.io/commitlint/#/)
    * commit message checker
* [@commitlint/config-conventional](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
    * commit message base rulesets
* [eslint](https://eslint.org/)
    * the pluggable linting utility for JavaScript and JSX
* [eslint-config-airbnb-base](https://github.com/airbnb/javascript) 
    * airbnb js coding conventions which we follow in IDC
* eslint-plugin-import
    * allow ES6 import to eslint
* [stylelint](https://stylelint.io/)
    * a mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
* [stylelint-scss](https://github.com/kristerkari/stylelint-scss)
    * the scss lint rules we follow


### compilation tools
* the tools used to build plugs which can consume yaml data files to feed pug templates
    * fs-extra
    * glob
    * deepmerge
    * js-yaml