const fs = require('fs-extra');
const wmd = require('wmd');
const pug = require('pug');
const path = require('path');

const {getFile, getFiles} = require('./importHelpers');
const {slugify} = require('./helpers');
const {getListItems} = require('./contentHelpers');

const compileListItem = function() {

}

const compileListItems = function() {
  return new Promise((resolve, reject) => {
    getListItems().then(listItems => {
      for (let item in listItems) {
        
      }
    });
  });
}

