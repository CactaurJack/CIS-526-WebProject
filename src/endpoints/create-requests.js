// Step 1: get the requests data from the form
// should be in req.body

const db = require('./database');
const sanitizeHTML = require('sanitize-html');
const serveError = require('./serve-error');


function createPost(req, res) {
  var id = req.body.id;
  var box_id = req.body.box_id;
  var request = req.body.request;
  content = sanitizeHTML(content);
  if(!title || !content) return serveError(req, res, 422, "Empty title or content encountered");
  var date = new Date().valueOf();
  
  // Publish the post to the database
  var info = db.prepare("INSERT INTO requests (id, box_id, ) VALUES (?, ?, ?)").run(title, content, date);
  
  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  res.statusCode = 302;
  res.setHeader("Location", '/box-locations/{box.id}');
  res.end();
}

module.exports = createPost;



// Step 2: save the data to the database

// Step 3: 
//check blog post data

// wrap in function
function createRequest(req, res){
res.statusCode = 302;
res.setHeader("Location", '/box-locations/{box.id}');
res.end();
}

module.export = createRequest;