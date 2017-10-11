const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressVue = require('/');

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

  })

  app.listen(4000);
}

modules.export.createAdminServer = createAdminServer;