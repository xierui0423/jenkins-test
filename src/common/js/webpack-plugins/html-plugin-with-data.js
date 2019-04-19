const path = require('path');
const jsyaml = require('js-yaml');
const deepmerge = require('deepmerge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Takes a string in train case and transforms it to camel case
 *
 * Example: 'hello-my-world' to 'helloMyWorld'
 *
 * @param {string} word
 */
function trainCaseToCamelCase(word) {
  return word.replace(/-([\w])/g, (match, p1) => p1.toUpperCase());
}

class HtmlWebpackPluginWithDataFiles extends HtmlWebpackPlugin {
  /**
   * Html post processing
   *
   * Returns a promise
   */
  executeTemplate(templateFunction, chunks, assets, compilation) {
    const self = this;
    return Promise.resolve()
    // Template processing
      .then(() => {
        const templateParams = this.getTemplateParameters(compilation, assets);
        let html = '';
        try {
          const globalData = { data: {} };
          const pageData = { data: {} };

          Object.keys(compilation.assets).forEach((asset) => {
            if (asset.indexOf('.yaml') > -1) {
              const value = jsyaml.load(compilation.assets[asset].source());
              if (!compilation.assets[asset].pageData) {
                const dataFieldName = trainCaseToCamelCase(path.basename(asset, '.yaml'));
                globalData.data[dataFieldName] = value;
              } else if (path.basename(self.childCompilationOutputName, '.html') === path.basename(asset, '.yaml')) {
                pageData.data = value;
              }
            }
          });

          Object.keys(pageData.data).forEach((field) => {
            if (Array.isArray(pageData.data[field])) {
              pageData.data[field].forEach((value, index) => {
                pageData.data[`${field}${index}`] = {
                  [field]: deepmerge(globalData.data[field] || {}, value, {
                    arrayMerge(sourceArray, destinationArray) {
                      return destinationArray;
                    },
                  }),
                };
              });
            }
          });

          html = templateFunction(Object.assign(deepmerge(globalData, pageData, {
            arrayMerge(sourceArray, destinationArray) {
              return destinationArray;
            },
          }), templateParams));
        } catch (e) {
          compilation.errors.push(new Error(`Template execution failed: ${e}`));
          return Promise.reject(e);
        }
        return html;
      });
  }
}

module.exports = HtmlWebpackPluginWithDataFiles;
