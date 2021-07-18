const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const loadBody = require('./src/load-body.js');
const createRequest = require('./endpoints/create-requests.js');
const createUser = require('./endpoints/create-user');
const newUser = require('./endpoints/new-user.js');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');


var app = express();

app.post("/signin", loadBody, createSession);
app.get("/signup", newUser);
app.post("/signup", loadBody, createUser);
app.get('/signin', newSession);
app.get("/box-locations.json", boxLocations);
app.post("/box-locations/:id/requests", loadBody, createRequests);


app.use(express.static('static'));