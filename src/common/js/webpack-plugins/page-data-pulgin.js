const path = require('path');

// use Polyfill for util.promisify in node versions < v8
const promisify = require('util.promisify');

const _ = require('lodash');
const fs = require('fs');

const fsStatAsync = promisify(fs.stat);
const fsReadFileAsync = promisify(fs.readFile);

const glob = require('glob');


class PageDataPlugin {
  constructor(options) {
    // Default options
    this.options = _.extend({
      componentFolderPath: './src/components',
      pageFolderPath: './src/pages',
    }, options);
  }

  apply(compiler) {
    const self = this;

    // Backwards compatible version of: compiler.plugin.emit.tapAsync()
    (compiler.hooks ? compiler.hooks.emit.tapAsync.bind(compiler.hooks.emit, 'Page Data Plugin') : compiler.plugin.bind(compiler, 'emit'))((compilation, callback) => {
      const dataFilesPromises = [];

      glob.sync(`${self.options.componentFolderPath}/**/*.yaml`).forEach((dataFile) => {
        dataFilesPromises.push(PageDataPlugin.addFileToAssets(dataFile, compilation, false));
      });

      // options is optional
      glob.sync(`${self.options.pageFolderPath}/**/*.yaml`).forEach((pageDataFile) => {
        dataFilesPromises.push(PageDataPlugin.addFileToAssets(pageDataFile, compilation, true));
      });

      Promise.all(dataFilesPromises).then(() => {
        callback();
      });
    });
  }

  static addFileToAssets(file, compilation, pageData) {
    const filename = path.resolve(compilation.compiler.context, file);
    return Promise.all([
      fsStatAsync(filename),
      fsReadFileAsync(filename),
    ])
      .then(([size, source]) => ({
        size,
        source,
      }))
      .catch(() => Promise.reject(new Error(`HtmlWebpackPlugin: could not load file ${filename}`)))
      .then((results) => {
        const basename = (pageData ? 'data/page/' : 'data/') + path.basename(filename);
        if (compilation.fileDependencies.add) {
          compilation.fileDependencies.add(filename);
        } else {
          // Before Webpack 4 - fileDepenencies was an array
          compilation.fileDependencies.push(filename);
        }

        // eslint-disable-next-line
        compilation.assets[basename] = {
          pageData,
          source: () => results.source,
          size: () => results.size.size,
        };
        return basename;
      });
  }
}

module.exports = PageDataPlugin;
