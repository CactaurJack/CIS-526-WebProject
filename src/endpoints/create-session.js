const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createSession
 * A helper method invoked when session creation is
 * successful.  The request should have an object
 * as its body parameter with username and password set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createSession(req, res) {
  
  var username = req.body.username;
  var password = req.body.password;
   var user = db.prepare("SELECT * FROM Users WHERE username = ?").get(username);
  if(!user) return failure(req, res, "Usename/Password not found.  Please try again.");
  bcrypt.compare(password, user.cryptedPassword, (err, result) => {
    if(err) return serveError(req, res, 500, err);
    if(result) success(req, res, user);
    else return failure(req, res, "Username/Password not found. Please try again.");
  });
}

/** @function success
 * Helper function for creating the user session after 
 * a successful login attempt.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {object} user - the user who signed in
 */
function success(req, res, user) {
  res.end(`Welcome ${user.username}.  You logged in successfully!`);
}

/** @function failure 
 * A helper function for reporting issues logging a 
 * user in.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - the error message for the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signin.html"]({
    errorMessage: errorMessage
  });
  var html = templates["layout.html"]({
    title: "Sign In",
    post: form,
    list: ""
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = createSession;