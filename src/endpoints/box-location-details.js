const db = require('../database.js');

//TODO:

// 1. Select the box-location data AND requests for that box

var selectAll = db.prepare('SELECT * FROM boxes LEFT JOIN requests ON boxes.id == requests.box_id WHERE boexes.id = ?').all(id);

var selectBox = db.prepare('SELECT * FROM boxes WHERE id = ?').get(id);

var selectRequests = db.prepare('SELECT * FROM requests WHERE boexes_id = ?').all(id);

// 2. render an HTML template with that data

// 3. Serve the rendered html string

module.exports = selectAll;
modlue.exports = selectBox;
module.exports = selectRequests;
