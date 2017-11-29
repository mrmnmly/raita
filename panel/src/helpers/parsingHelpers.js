import config from './../config.json';

// helper function that convert string to slug
export function slugify(txt) {
  return txt.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/[^\w-]+/g,'');
}

// helper function that creates new file url based on folder and article title
// export function prepareNewFileUrl(currentFolder, title) {
//   const slug = slugify(title);
//   const newUrl = currentFolder ?
//     `${config.api.endpoints.getRootUrl}${currentFolder}/${slug}` :
//     `${config.api.endpoints.getRootUrl}${slug}`;
//   return newUrl;

// }
