const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const {getDirectories, getFiles, getFile} = require('./importHelpers');
const config = require('./../config.json');

const getListThemes = () => {
  const themePath = path.join(__dirname, './../theme/', config.theme, '/');
  return new Promise((resolve,reject) => {
    getDirectories(themePath).then(folders => {
      resolve(folders);
    });
  });
}

const getThemeFolderItems = (pathString) => {
  const folderPath = pathString === '/' ?
    path.join(__dirname, './../theme/', config.theme, '/') :
    path.join(__dirname, './../theme/', config.theme, pathString, '/');
  return new Promise((resolve, reject) => {
    getFiles(folderPath).then(files => {
      const fullPathFiles = files.map(file => {
        return path.join(folderPath, file);
      });
      resolve(fullPathFiles);
    })
  });
}

const mapThemeFoldersToObject = (folders) => {
  let mapped = {};
  for (let folder in folders) {
    mapped[folders[folder]] = {};
  }
  return mapped;
}

const getThemeData = () => {
  let data = {};
  let promises = [];
  return new Promise((resolve, reject) => {
    getListThemes().then(directories => {
      data.lists = mapThemeFoldersToObject(directories);
      getThemeFolderItems('/').then(pages => {
        data.pages = pages;
        for (let folder in directories) {
          let promise = getThemeFolderItems(directories[folder]);
          promises.push(promise);
        }
        Promise.all(promises).then(results => {
          for (let folder in directories) {
            data.lists[directories[folder]] = results[folder];
          }
          resolve(data);
        });
      });
    });
  });
}

// retrieves theme file based on provided content markdown object
const getThemeFile = (contentObj) => {
  return new Promise((resolve, reject) => {
    if (contentObj.type === 'page') {
      getPageTheme(contentObj.slug).then(theme => {
        resolve(theme);
      });
    } else {
      getListItemTheme(contentObj.folder).then(theme => {
        resolve(theme);
      });
    }
  });
}

// get theme for page (based on page slug)
const getPageTheme = (pageName) => {
  return new Promise((resolve, reject) => {
    const themeUrl = path.join(__dirname, './../theme/', config.theme, `${pageName}.pug`);
    getFile(themeUrl).then(data => {
      resolve(data);
    });
  });
}

// get theme for list item (based on item's parent folder)
const getListItemTheme = (itemFolder) => {
  return new Promise((resolve, reject) => {
    const themeUrl = path.join(__dirname, './../theme/', config.theme, '/', itemFolder, '/item.pug');
    getFile(themeUrl).then(data => {
      resolve(data);
    });
  });
}

// get theme for list (based on list name)
const getListTheme = (listName) => {
  return new Promise((resolve, reject) => {
    const themeUrl = path.join(__dirname, './../theme/', config.theme, '/', listName, '/list.pug');
    getFile(themeUrl).then(data => {
      resolve(data);
    });
  });
}


module.exports.getListThemes = getListThemes;
module.exports.getThemeFolderItems = getThemeFolderItems;
module.exports.getThemeData = getThemeData;
module.exports.getThemeFile = getThemeFile;
module.exports.getPageTheme = getPageTheme;
module.exports.getListItemTheme = getListItemTheme;
module.exports.getListTheme = getListTheme;
