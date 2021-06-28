const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');

function handleRequest(req, res) {
  if(req.method !== 'GET') return res.writeHead(501).end();
  var pathname = new URL(req.url, 'http://localhost').pathname;    
  fs.stat(path.join("public", pathname), (err, stat) => {
    if(err) return res.writeHead(404).end();
    if(stat.isFile()) return serveFile(req, res);
    if(stat.isDirectory()) return listDirectory(req, res);
    return res.writeHead(404).end();
  });
}

module.exports = handleRequest;