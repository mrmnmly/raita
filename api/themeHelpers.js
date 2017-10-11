const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const {getDirectories, getFiles} = require('./importHelpers');
const config = require('./../config.json');

const getListThemes = function() {
  const themePath = path.join(__dirname, './../theme/', config.theme, '/');
  return new Promise((resolve,reject) => {
    getDirectories(themePath).then(folders => {
      resolve(folders);
    });
  });
}

const getThemeFolderItems = function(pathString) {
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

const mapThemeFoldersToObject = function(folders) {
  let mapped = {};
  console.log(folders)
  for (let folder in folders) {
    mapped[folders[folder]] = {};
  }
  return mapped;
}

const getThemeData = function() {
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

module.exports.getListThemes = getListThemes;
module.exports.getThemeFolderItems = getThemeFolderItems;
module.exports.getThemeData = getThemeData;
