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
  const folderPath = pathString === '/' ? path.join(__dirname, './../theme/') : path.join(__dirname, './../theme/', pathString, '/');
  return new Promise((resolve, reject) => {
    getFiles(folderPath).then(files => {
      const fullPathFiles = files.map(file => {
        return path.join(folderPath, file);
      });
      resolve(fullPathFiles);
    })
  });
}