const Database = require('better-sqlite3');

/** @module database 
 * Provides access to the better-sqlite3 database object 
 * for the project.
 */

Database.prepare(`CREATE TABLE [IF NOT EXISTS] community-chest.requests (id INTEGER PRIMARY KEY,
box_id INTEGER FOREIGN KEY, request TEXT, fullfilled INTEGER);` );
module.exports = new Database('db/community-chest.sqlite3');