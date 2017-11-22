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

// article object has to contain folder and file (name + extension, .md mostly) property
export function getApiArticleContents(article) {
  return fetch(`${config.api.domain}${config.api.endpoints.getArticleContents}${article.folder}/${article.file}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    console.error('There was an error during fetching article contents.');
    return {};
  });
};
