// file contains methods that parse content and theme files and save it into output folder
const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

// function that returns list of directories inside given path
// returnFullPaths toggles if returned folder contains full paths (not directory name only)
const getDirectories = function(pathString, returnFullPaths = true) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathString, (err, files) => {
      if (err) {
        reject(err);
      }
      if (returnFullPaths) {
        let fileList = [];
        for (let file in files) {
          list.push(path.join(url, files[file]));
        }
        resolve(list);
      }
      resolve(files);
    })
  });
}

// function that returns contents of the given file path
const getFile = function(pathString) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathString, 'utf8', (err, data) => {
      if (err) {
        console.log('There was a problem when reading a file: ', pathString);
        reject(err);
      }
      resolve(data);
    })
  });
}

// function that returns binary data from given file path
const getImage = function(pathString) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathString, 'binary', (err, data) => {
      if (err) {
        console.log('There was a problem when reading a image file: ', pathString);
        reject(err);
      }
      resolve(data);
    });
  });
}

// function that returns files in given folder path
const getFiles = function(pathString) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathString, (err, files) => {
      if (err) {
        console.log('There was a problem when reading a folder path: ', pathString);
        reject(err);
      }
      let filesArray = [];
      filesArray = files.filter(obj => {
        return !fs.statSync(path.join(pathString, obj)).isDirectory();
      });
      resolve(filesArray);
    });
  });
}

module.exports.getDirectories = getDirectories;
module.exports.getFile = getFile;
module.exports.getImage = getImage;
module.exports.getFiles = getFiles;
