const fs = require('fs');
const path = require('path');
const pathToMimeType = require('./path-to-mime-type');
const request = require('request')

function serveFile(req, res) {
  var pathname = new URL(req.url, 'http://localhost').pathname;
  var filePath = path.join('public', pathname);
  fs.readFile(filePath, function(err, body){
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
    }
    res.end(body);
  });
}

module.exports = serveFile;

  var pathname = new URL(req.url, "http://localhost").pathname;
  var filePath = path.join('public', pathname);
  var mimeType = pathToMimeType(filePath);