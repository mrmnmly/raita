import config from './../config.json';
import { decodeBase64Image } from './parsingHelpers';

// function that fetches all available lists
export function getApiLists() {
  return fetch(`${config.api.domain}${config.api.endpoints.getLists}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during fetching lists.');
    return {};
  });
};

// article object has to contain folder name (text) and file name (text, name + extension, .md mostly) property
export function getApiArticleContents(article) {
  return fetch(`${config.api.domain}${config.api.endpoints.getArticleContents}${article.folder}/${article.file}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during fetching article contents.');
    return {};
  });
};

// article object has to contain content (text), url (text) and customFields property (object)
export function saveApiArticle(articleObj) {
  return fetch(`${config.api.domain}${config.api.endpoints.saveArticle}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      dataType: 'json',
      body: JSON.stringify(articleObj),
    }).then(resp => {
    if (resp.ok) {
      return resp;
    }
    console.error('There was an error during saving file.');
    return {};
  });
};

export function getContentsRootUrl() {
  return fetch(`${config.api.domain}${config.api.endpoints.getRootUrl}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error when obtaining root contents folder path.');
    return {};
  });
};

// remove file (e.g. when title or date is updated so slug is now different and so file name should be)
export function removeApiFile(url) {
  return fetch(`${config.api.domain}${config.api.endpoints.removeFile}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      dataType: 'json',
      body: JSON.stringify({
        url: url
      }),
    }).then(resp => {
    if (resp.ok) {
      return resp;
    }
    console.error('There was an error during removing file.');
    return {};
  });
};


const uploadApiImageHelper = function(fileObj) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    const filename = fileObj.name;
    reader.onload = function(e){
      let img = reader.result;
      return fetch(`${config.api.domain}${config.api.endpoints.saveImage}`, {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        method: 'POST',
        dataType: 'json',
        body: JSON.stringify({
          file: img,
          name: filename
        }),
      }).then(resp => {
        if (resp.ok) {
          resolve(resp);
          return;
        }
        console.error('There was an error during uploading image file.');
        reject();
      });
    }
    return reader.readAsDataURL(fileObj);
  });
}

export function uploadApiImage(fileObj) {
  return uploadApiImageHelper(fileObj).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during uploading image file.');
    return;
  });
}

export function parseApiMarkdownToHtml(content) {
  return fetch(`${config.api.domain}${config.api.endpoints.parse2html}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    dataType: 'json',
    body: JSON.stringify({
      markdown: content
    }),
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during markdown parse.');
    return '';
  });
}

// fetches list of available pages
export function getApiPages() {
  return fetch(`${config.api.domain}${config.api.endpoints.getPages}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during fetching lists.');
    return {};
  });
};

// page object has to contain file name (text, name + extension, .md mostly) property
export function getApiPageContents(page) {
  return fetch(`${config.api.domain}${config.api.endpoints.getPageContents}${page.file}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during fetching page contents.');
    return {};
  });
};

// compile all created contents with chosen theme into static page
export function compileApiContents() {
  return fetch(`${config.api.domain}${config.api.endpoints.compile}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  }).then(resp => {
    if (resp.ok) {
      return resp.ok;
    }
    console.error('There was an error during content compilation.');
    return {};
  });
};