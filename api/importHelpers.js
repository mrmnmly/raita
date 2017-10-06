// file contains methods that parse content and theme files and save it into output folder
const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

// function that returns list of directories inside given path
// returnFullPaths toggle if returned folder contains full paths (not name only)
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