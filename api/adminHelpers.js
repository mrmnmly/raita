// file contains methods that helps handle data to be displayed/parsed in admin panel
const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const {getDirectories, getFiles} = require('./importHelpers');

// helper function that returns complete file list, that will be displayed in admin section sidebar
const getFileList = function() {
  const sourcePath = path.join(__dirname, '/../source/');
  let fileList = {};
  return new Promise((resolve, reject) => {
    getDirectories(sourcePath).then(itemDirectories => {
      if (itemDirectories) {
        getFiles(sourcePath).then(rootFiles => {
          let filesArray = [];
          let promisesArray = [];
          for (let item in itemDirectories) {
            const p = new Promise((res, rej) => {
              const currentFolder = path.join(__dirname, '/../source/', itemDirectories[item]);
              getFiles(currentFolder).then(files => {
                fileList[itemDirectories[item]] = [];
                for (let file in files) {
                  const fullFilePath = path.join(currentFolder, files[file]);
                  const obj = {
                    category: itemDirectories[item],
                    file: files[file],
                    path: fullFilePath
                  }
                  fileList[itemDirectories[item]].push(obj);
                }
                fileList[itemDirectories[item]].reverse();
                res(fileList);
              });
            });
            promisesArray.push(p);
          }
          Promise.all(promisesArray).then(fileList => {
            for (let rootFile in rootFiles) {
              const obj = {
                title: rootFiles[rootFile].slice(0, -4),
                path: path.join('/', rootFiles[rootFile])
              }
              fileList[obj.title] = obj;
            }
            resolve(fileList);
          });
        });
      }
    });
  });
}

// helper function for image decoding
const decodeBase64Image = function(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    return new Error('Invalid input string!');
  }
  const response = {
    type: matches[1],
    data: new Buffer(matches[2], 'base64')
  }
  return response;
}

module.exports.getFileList = getFileList;
module.exports.decodeBase64Image = decodeBase64Image;
