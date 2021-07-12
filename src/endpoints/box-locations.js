const fs = require('fs');
const db = require('../database.js');
const bld = require('./box-locations-details');

// TODO: Get all boxes from the database

var Table = selectAll();
var jsonString = JSON.stringify(Table);
fs.writeFile(../../box-locations.json, jsonString, err => {
             if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
});

//this endpoint corresponds to the route
// /box-locations.json
// delete the static box-location.json

// Turn that arrayinto a JSON string

// Server JSON string

//Content type for JSON is "application/json"

