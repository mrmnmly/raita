// file contains methods that parse content and theme files and save it into output folder
const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

// TODO
const importHelpers = require('./importHelpers');

// compile item themes (files that contains '-item.pug' string in the filename)
const compileItemThemes = function (itemThemes) {
  // clear output folder before compiling new items
  fs.emptyDir(path.join(__dirname, '/../output/')).then(() => {
    // this variable will store all data for content
    let rssJson = {};
    for (let item in itemThemes) {
      if (itemThemes[item] !== undefined) {
        // name contains the original filename but '-item.pug' string (9 last chars)
        const name = itemThemes[item].slice(0, -9);
        // itemsPath points on the folder name of content files, which should be using current theme file
        const itemsPath = path.join(__dirname, '/../source/', name, '/');
        // outputPath points on the folder name where generated files will be stored
        const outputPath = path.join(__dirname, '/../output/', name, '/');
        // themePath points on theme file for current theme
        const themePath = path.join(__dirname, './../theme/', itemThemes[item]);
        rssJson[name] = [];
        // get theme file
        importHelpers.getFile(themePath, themeFile => {
          // get filenames of content source item files
          importHelpers.getFiles(itemsPath, itemFiles => {
            for (let file in itemFiles) {
              // sourceFilePath points on source file with content to parse
              const sourceFilePath = path.join(itemsPath, itemFiles[file]);
              
            }
          })
        });
      }
    }
  });
}