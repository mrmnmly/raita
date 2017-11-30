import config from './../config.json';

// helper function that convert string to slug
export function slugify(txt) {
  return txt.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/[^\w-]+/g,'');
}
