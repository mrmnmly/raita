const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');
var sass = require('node-sass');
var compressor = require('node-minify');

const { getDirectories, getFiles, getFile, getFolderContents } = require('./importHelpers');
const config = require('./../config.json');

const getListThemes = () => {
  const themePath = path.join(__dirname, './../theme/', config.theme);
  return new Promise((resolve,reject) => {
    getDirectories(themePath).then(folders => {
      resolve(folders);
    });
  });
}

const getThemeFolderItems = (pathString) => {
  const folderPath = pathString === '/' ?
    path.join(__dirname, './../theme/', config.theme) :
    path.join(__dirname, './../theme/', config.theme, pathString);
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
    const themeUrl = path.join(__dirname, './../theme/', config.theme, itemFolder, '/item.pug');
    getFile(themeUrl).then(data => {
      resolve(data);
    });
  });
}

// get theme for list (based on list name)
const getListTheme = (listName) => {
  return new Promise((resolve, reject) => {
    const themeUrl = path.join(__dirname, './../theme/', config.theme, listName, '/list.pug');
    getFile(themeUrl).then(data => {
      resolve(data);
    });
  });
}

// compile single sass file to output folder as css
const compileSassFile = (url) => {
  const outputUrl = path.join(__dirname, './../output/static/css');
  const fileName = path.parse(url).name;
  const outputFileUrl = path.join(outputUrl, `${fileName}.css`);
  return new Promise((resolve, reject) => {
    sass.render({
      file: url,
      outFile: outputFileUrl,
      sourceMap: true,
      outputStyle: 'compressed',
    }, function(err, result) {
      if (err) {
        console.warn('Error during sass compilation! ', err);
        reject();
      }
      fs.outputFile(outputFileUrl, result.css, function(fileErr){
        if(!fileErr){
          resolve();
        } else {
          console.warn('Error during css file save! ', fileErr);
          reject();
        }
      });
    });
  });
}

// compile sass styles to css
const compileStyles = () => {
  const urlToSass = path.join(__dirname, './../theme/', config.theme, '/static/scss');
  return new Promise((resolve, reject) => {
    getFolderContents(urlToSass).then((files) => {
      let promises = [];
      for (let file of files) {
        const pathToFile = path.join(urlToSass, file);
        promises.push(compileSassFile(pathToFile));
      }
      Promise.all(promises).then(() => {
        console.log('All styles compiled!');
        resolve();
      })
    });
  });
};

// uglify theme js files
const uglifyScripts = () => {
  const themeScriptsPath = path.join(__dirname, './../theme/', config.theme, 'static/js');
  const outputScriptsPath = path.join(__dirname, './../output/static/js/bundle.js');
  return new Promise((resolve, reject) => {
    let promise = compressor.minify({
      compressor: 'uglifyjs',
      input: `${themeScriptsPath}/*.js`,
      output: outputScriptsPath,
    });

    return promise.then(() => {
      console.log('All theme scripts uglified!');
      resolve();
    });
  });
};


module.exports.getListThemes = getListThemes;
module.exports.getThemeFolderItems = getThemeFolderItems;
module.exports.getThemeData = getThemeData;
module.exports.getThemeFile = getThemeFile;
module.exports.getPageTheme = getPageTheme;
module.exports.getListItemTheme = getListItemTheme;
module.exports.getListTheme = getListTheme;
module.exports.compileStyles = compileStyles;
module.exports.uglifyScripts = uglifyScripts;
