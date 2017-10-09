
// helper function that convert string to slug
const slugify = function(txt){
  return txt.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_').replace(/[^\w-]+/g,'');
}

// helper function for image decoding
const decodeBase64Image = function(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    return new Error('Invalid input string!');
  }
  const response = {
    type: matches[1],
    data: new Buffer(matches[2], 'base64')
  }
  return response;
}

module.exports.slugify = slugify;
module.exports.decodeBase64Image = decodeBase64Image;
