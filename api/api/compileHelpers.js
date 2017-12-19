const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const { getFile, getFiles } = require('./importHelpers');
const { slugify } = require('./helpers');
const { getListFolders, getListFolderContents, getPagesEntries } = require('./contentHelpers');
const { getListTheme, getPageTheme, getListItemTheme, compileStyles, uglifyScripts, copyThemeAssets } = require('./themeHelpers');
const { createContextForList, createContextFromFile } = require('./contextHelpers');

const config = require('./../config.json');
const themeUrl = path.join(__dirname, './../theme/', config.theme);

const compileLists = () => {
  let promises = [];
  return new Promise((resolve, reject) => {
    getListFolders().then(lists => {
      for (let list in lists) {
        let promise = compileSingleList(lists[list]);
        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        console.log('All lists are compiled!');
        resolve();
      });
    });
  })
}

const compileSingleList = (listName) => {
  return new Promise((resolve, reject) => {
    const themeFileUrl = path.join(themeUrl, listName, 'list.pug');
    getListTheme(listName).then(theme => {
      getListFolderContents(listName).then(contents => {
        createContextForList(contents).then(listContext => {
          console.log(listContext)
          const context = {
            context: {
              list: listContext
            }
          }
          const pugHelper = pug.compile(theme, { filename: themeFileUrl });
          const fileToSave =  pugHelper({...context, fileName: listName});
          const outputPath = path.join(__dirname, './../output/', listName, '/');
          fs.emptyDir(outputPath).then(() => {
            fs.outputFile(path.join(outputPath, 'index.html'), fileToSave).then(() => {
              // in the end generate all list entry items
              compileListItems(listContext).then(() => {
                resolve();
              });
            });
          });
        });
      });
    });
  });
}

// compiles all entries that are in the list
const compileListItems = (listItems) => {
  let promises = [];
  return new Promise((resolve, reject) => {
    for (let item in listItems) {
      let promise = compileListItem(listItems[item]);
      promises.push(promise);
    }
    Promise.all(promises).then(() => {
      if (listItems.length && listItems[0].folder) {
        console.log(`All ${listItems[0].folder} list items are compiled!`);
      } else {
        console.log('All list items are compiled!');
      }
      resolve();
    });
  });
}

// compile single list entry
const compileListItem = (contextObj) => {
  return new Promise((resolve, reject) => {
    const themeFileUrl = path.join(themeUrl,  contextObj.folder, 'item.pug');
    createContextFromFile(contextObj.path).then(context => {
      getListItemTheme(contextObj.folder).then(theme => {
        const pugHelper = pug.compile(theme, { filename: themeFileUrl });
        const fileToSave =  pugHelper({...context, folder: contextObj.folder});
        const outputPath = path.join(__dirname, './../output/', contextObj.folder, contextObj.slug);
        const outputFilePath = path.join(outputPath, 'index.html')
        fs.emptyDir(outputPath).then(() => {
          fs.outputFile(outputFilePath, fileToSave).then(() => {
            resolve();
          });
        });
      });
    });
  });
}

// compile all pages
const compilePages = () => {
  let promises = [];
  return new Promise((resolve, reject) => {
    getPagesEntries().then(pages => {
      for (let page in pages) {
        let promise = compileSinglePage(pages[page].slug);
        promises.push(promise);
      }
      Promise.all(promises).then(results => {
        console.log('All pages are compiled!');
        resolve();
      });
    });
  });
}

// compile single page
const compileSinglePage = (pageName) => {
  return new Promise((resolve, reject) => {
    const themeFileUrl = path.join(themeUrl, `${pageName}.pug`);
    getPageTheme(pageName).then(theme => {
      const pageContextUrl = path.join(__dirname, './../source/', `${pageName}.md`);
      let outputPath = path.join(__dirname, './../output/', pageName, '/');
      createContextFromFile(pageContextUrl).then(context => {
        const pugHelper = pug.compile(theme, { filename: themeFileUrl });
        const fileToSave = pugHelper(context);
        fs.emptyDir(outputPath).then(() => {
          if (pageName === 'home') {
            outputPath = path.join(__dirname, './../output/');
          }
          fs.outputFile(path.join(outputPath, 'index.html'), fileToSave).then(() => {
            resolve();
          });
        });
      });
    });
  });
}

const compileEverything = () => {
  return new Promise((resolve, reject) => {
    Promise.all([compileLists(), compilePages(), compileStyles(), uglifyScripts(), copyThemeAssets()]).then(() => {
      resolve();
    });
  });
}

module.exports.compileLists = compileLists;
module.exports.compileSingleList = compileSingleList;
module.exports.compileListItems = compileListItems;
module.exports.compileListItem = compileListItem;
module.exports.compilePages = compilePages;
module.exports.compileSinglePage = compileSinglePage;
module.exports.compileEverything = compileEverything;
