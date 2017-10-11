const path = require('path');
const wmd = require('wmd');

const {getDirectories, getFiles, getFile} = require('./importHelpers');

const getListFolders = function() {
  const sourcePath = path.join(__dirname, '/../source/');
  return new Promise((resolve, reject) => {
    getDirectories(sourcePath).then(itemDirectories => {
      resolve(itemDirectories);
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
          folder: folderName,
          path: path.join(fullFolderPath, files[file]),
          slug: files[file].split('.')[0],
          file: files[file],
          type: 'list-item'
        }
        folderContents.push(obj);
      }
      resolve(folderContents);
    });
  });
}

const getListItems = function() {
  return new Promise((resolve, reject) => {
    getListFolders().then(folders => {
      let promises = [];
      let result = {};
      for (let folder in folders) {
        const promise = getListFolderContents(folders[folder]);
        promises.push(promise);
      }
      Promise.all(promises).then((folderContents) => {
        for (let content in folderContents) {
          if (folderContents[content].length) {
            result[folderContents[content][0].folder] = folderContents[content];
          }
        }
        resolve(result);
      });
    });
  });
}

const getPagesEntries = function() {
  const sourcePath = path.join(__dirname, '/../source/');
  let pages = {};
  return new Promise((resolve, reject) => {
    getFiles(sourcePath).then(files => {
      for (let file in files) {
        const obj = {
          file: files[file],
          slug: files[file].slice(0, -3),
          path: path.join(sourcePath, files[file]),
          type: 'page'
        }
        pages[obj.slug] = obj;
      }
      resolve(pages);
    });
  });
}

const getSiteContents = function() {
  let results = {};
  return new Promise((resolve, reject) => {
    getListItems().then(listItems => {
      getPagesEntries().then(pageItems => {
        results = {
          lists: {...listItems},
          pages: {...pageItems}
        }
        resolve(results);
      });
    });
  });
}

const createContextForList = function(folderContents) {
  let promises = [];
  return new Promise((resolve, reject) => {
    for (let file in folderContents) {
      let promise = getFile(folderContents[file].path);
      promises.push(promise);
    }
    Promise.all(promises).then(results => {
      for (let file in folderContents) {
        const content = wmd(results[file]);
        folderContents[file].meta = content.metadata;
      }
      resolve(folderContents);
    });
  });
}

module.exports.getListFolders = getListFolders;
module.exports.getListFolderContents = getListFolderContents;
module.exports.getListItems = getListItems;
module.exports.getPagesEntries = getPagesEntries;
module.exports.getSiteContents = getSiteContents;
module.exports.createContextForList = createContextForList;
