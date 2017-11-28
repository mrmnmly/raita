import config from './../config.json';

export function getApiLists() {
  return fetch(`${config.api.domain}${config.api.endpoints.getLists}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during fetching lists.');
    return {};
  });
};

// article object has to contain folder name (text) and filename (text, name + extension, .md mostly) property
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
      console.log(resp)
      return resp.json();
    }
    console.error('There was an error when obtaining root contents folder path.');
    return {};
  });
};
