'use strict';

const path = require('path');
const http = require('http');
const Express = require('express');

// initialize the server and configure support for ejs templates
const app = new Express();

// Setup EJS templating engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '../../public')));

// Start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
const server = new http.Server(app);
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});