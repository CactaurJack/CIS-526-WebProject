const express = require('express');
//install this blog excercise
const boxLocations = require('./endpoints/box-locations.js');
const loadBody = require('./src/load-body.js');
const createRequest = require('./endpoints/create-requests.js');

var app = express();
app.get("/box-locations.json", boxLocations);
app.post("/box-locations/:id/requests", loadBody, createRequests);


app.use(express.static('static'));