const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(deck + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(deck));
app.use(express.static(path.join(deck, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(deck, 'build', 'index.html'));
});
app.listen(port);