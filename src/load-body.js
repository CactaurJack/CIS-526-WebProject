function loadBody(req, res, next) {
  var chunks = [];
  
  // listen for data events
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  
  // listen for end events
  req.on('end', () => {
    var data = Buffer.concat(chunks);
    var encoding = req.headers['content-type'];
    switch(encoding.split(';')[0]) {
      case 'application/x-www-form-urlencoded':
        req.body = querystring.parse(data.toString());
        next();
        break;
      case 'multipart/form-data':
         try {
           var match = /boundary=(.+)$/.exec(req.headers["content-type"]);
           var boundary = match[1];
           req.body = parseMultipart(data, boundary);
           next();
         } catch(err) {
           serveError(req, res, 422, err);
         }
        break;
      case 'text/plain':
        req.body = data.toString();
        next();
        break;
      case 'application/json':
        try {
          req.body = JSON.parse(data.toString());
          next();
        } catch(err) {
          serveError(req, res, 400, err);
        }
        break
      default:
        serveError(req, res, 501, `Body Content-Type ${encoding} not supported`);
    }
  });
  
  // listen for error events
  req.on('error', (err) => {
    serveError(req, res, 400, err);
  });
}

module.exports = loadBody;