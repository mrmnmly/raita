const path = require('path');
const wmd = require('wmd');

const {getFile} = require('./importHelpers');

const createContextForList = (folderContents) => {
  let promises = [];
  return new Promise((resolve, reject) => {
    for (let file in folderContents) {
      let promise = getFile(folderContents[file].path);
      promises.push(promise);
    }
    Promise.all(promises).then(results => {
      for (let file in folderContents) {
        const content = wmd(results[file], { preprocessors: [wmd.preprocessors.metadata, wmd.preprocessors.fencedCodeBlocks] });
        folderContents[file].meta = content.metadata;
      }
      resolve(folderContents);
    });
  });
}

// gets context data from file url - works both for list entries and pages
const createContextFromFile = (fileUrl) => {
  return new Promise((resolve, reject) => {
    getFile(fileUrl).then(data => {
      const parsedData = {
        context: wmd(data, { preprocessors: [wmd.preprocessors.metadata, wmd.preprocessors.fencedCodeBlocks] }),
        fileName: path.parse(fileUrl).name,
      }
      resolve(parsedData);
    });
  });
}

module.exports.createContextForList = createContextForList;
module.exports.createContextFromFile = createContextFromFile;
