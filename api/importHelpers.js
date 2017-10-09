// file contains methods that parse content and theme files and save it into output folder
const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

// function that returns list of directories inside given path
const getDirectories = function(pathString) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathString, (err, files) => {
      if (err) {
        resolve([]);
      }
      files = files.filter(obj => {
        return fs.statSync(path.join(pathString, obj)).isDirectory();
      });
      resolve(files);
    })
  });
}

// function that returns list of files & directories inside given path
const getFolderContents = function(pathString) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathString, (err, files) => {
      if (err) {
        resolve([]);
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
        resolve('');
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
        resolve('');
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
        console.log('There was a problem when reading a folder path: ', pathString, err);
        resolve([]);
      }
      if (files && files.length) {
        let filesArray = [];
        filesArray = files.filter(obj => {
          return !fs.statSync(path.join(pathString, obj)).isDirectory();
        });
        resolve(filesArray);
      }
      resolve([]);
    });
  });
}

module.exports.getDirectories = getDirectories;
module.exports.getFolderContents = getFolderContents;
module.exports.getFile = getFile;
module.exports.getImage = getImage;
module.exports.getFiles = getFiles;
