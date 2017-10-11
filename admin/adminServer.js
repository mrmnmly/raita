const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressVue = require('express-vue');

const createAdminServer = () => {
  const app = express();
  const vueOptions = {
    rootPath: path.join(__dirname, './views'),
    layout: {
      start: '<div id="app">',
      end: '</div>'
    }
  };
  const expressVueMiddleware = expressVue.init(vueOptions);
  app.use(expressVueMiddleware);

  app.get('/', (req, res) => {
    res.renderVue('main', {}, {});
  });

  app.listen(4000);
}

module.exports.createAdminServer = createAdminServer;