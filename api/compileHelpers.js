const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const {getFile, getFiles} = require('./importHelpers');
const {slugify} = require('./helpers');
const {getListFolders, getListFolderContents, createContextForList} = require('./contentHelpers');
const {getListTheme} = require('./themeHelpers');


const compileLists = function() {
  let promises = [];
  return new Promise((resolve, reject) => {
    getListFolders().then(lists => {
      for (let list in lists) {
        let promise = compileSingleList(lists[list]);
        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        resolve();
      });
    });
  })
}

const compileSingleList = function(listName) {
  return new Promise((resolve, reject) => {
    getListTheme(listName).then(theme => {
      getListFolderContents(listName).then(contents => {
        createContextForList(contents).then(listContext => {
          const context = {
            context: {
              list: listContext
            }
          }
          const fileToSave = pug.render(theme, context);
          const outputPath = path.join(__dirname, './../output/', listName, '/');
          fs.emptyDir(outputPath).then(() => {
            fs.outputFile(path.join(outputPath, 'index.html'), fileToSave).then(() => {
              resolve();
            });
          });
        });
      });
    });
  });
}

module.exports.compileLists = compileLists;
module.exports.compileSingleList = compileSingleList;
