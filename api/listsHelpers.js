const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const {getDirectories, getFiles} = require('./importHelpers');

const getListFolders = function() {
  const sourcePath = path.join(__dirname, '/../source/');
  return new Promise((resolve, reject) => {
    getDirectories(sourcePath).then(itemDirectories => {
      const listFolders = itemDirectories.filter(obj => {
        return obj.indexOf('-list') > -1;
      });
      resolve(listFolders);
    });
  });
}

const getListFolderContents = function(folderName) {
  const fullFolderPath = path.join(__dirname, '/../source/', folderName, '/');
  let folderContents = [];
  return new Promise((resolve, reject) => {
    getFiles(fullFolderPath).then(files => {
      for (let file in files) {
        const obj = {
          category: folderName.slice(0, -5),
          folder: folderName,
          path: path.join(fullFolderPath, files[file]),
          slug: files[file].split('.')[0]
        }
        folderContents.push(obj);
      }
      resolve(folderContents);
    });
  });
}

const getListItems = async function() {
  return new Promise((resolve, reject) => {
    getListFolders().then(folders => {
      let promises = [];
      let result = {};
      for (let folder in folders) {
        const promise = getListFolderContents(folders[folder]);
        promises.push(promise);
        result[folders[folder]] = [];
      }
      Promise.all(promises).then((folderContents) => {
        for (let content in folderContents) {
          result[folderContents[content][0].folder] = folderContents[content];
        }
        resolve(result);
      });
    });
  });
}

module.exports.getListFolders = getListFolders;
module.exports.getListFolderContents = getListFolderContents;
module.exports.getListItems = getListItems;
